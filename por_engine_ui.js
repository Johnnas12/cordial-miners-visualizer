(function () {
  "use strict";

  const engine = window.CordialPorDemo;
  const names = engine.VALIDATORS;
  const stageNames = ["Ratings", "Normalize", "Liquid Rank", "Blend", "Clamp + penalty", "Activate"];
  const stageDescriptions = [
    {
      summary: "Validators rate other validators. This is one round's input, not a voting-weight change yet.",
      equation: "s[i,j] = rating from validator j about validator i; self-ratings are excluded",
      paper: "Reputation should reflect peer evaluations, with a transparent and auditable record of who rated whom. Ratings are observations, not an immediate consensus vote.",
      implementation: "The real engine checks signer identity, bounds, duplicates, and the finalized-prefix checkpoint before accepting a canonically sorted round batch. These sliders stand in for already accepted ratings."
    },
    {
      summary: "Normalize each recipient's ratings against that recipient's own minimum and maximum.",
      equation: "N[i,j] = (s[i,j] - min[i] + 1) / (max[i] - min[i] + 1)",
      paper: "Modified normalization makes ratings comparable while retaining a positive floor. A rater's score is interpreted in the context of the scores received by that recipient.",
      implementation: "The Rust engine performs this formula per recipient using integer fixed-point arithmetic (scale = 10^9), truncating division. Equal ratings normalize to 1."
    },
    {
      summary: "A rater's influence is proportional to their previous reputation.",
      equation: "P[i] = sum over raters j of N[i,j] * R_previous[j]",
      paper: "Liquid Rank lets established reputation shape the influence of ratings. A high-reputation rater contributes more than a low-reputation rater with the same normalized score.",
      implementation: "Products are accumulated in canonical rater order with checked integer arithmetic, then divided by the fixed-point scale once. This is a contribution, not yet the new reputation."
    },
    {
      summary: "Combine this round's contribution with the previous finalized reputation.",
      equation: "B[i] = alpha * P[i] + (1 - alpha) * R_previous[i]",
      paper: "Temporal blending limits how much one round of ratings can move reputation. Alpha determines how quickly new evidence changes the prior state.",
      implementation: "The default alpha is 0.60. Rust calculates the weighted sum in fixed-point and truncates once. A recipient missing from the real sparse rating batch is carried forward by the default policy."
    },
    {
      summary: "Bound the blended value, then apply authorized penalty events.",
      equation: "C[i] = B[i] / sqrt(1 + B[i]^2)\npenalty = 25% if equivocating share <= 30%, otherwise 100%\nretained[D] = R_previous[D] * (1 - penalty); active[D] = 0",
      paper: "A smooth saturation curve prevents unbounded reputation growth; prompt slashing and exclusion make provable misbehavior costly.",
      implementation: "Rust uses integer square root and round-to-nearest division for the clamp. On verified equivocation, D is permanently ejected from weight export; its retained balance is based on previous reputation with a 25% or 100% penalty."
    },
    {
      summary: "Seal the audited reputation snapshot, then project active weights onto bonded validators.",
      equation: "W = sum active weights; weighted quorum iff 3 * support_weight > 2 * W",
      paper: "Cordial PoR proposes reputation-weighted consensus and leader influence, including a >W/2 quorum in its design note.",
      implementation: "Our Cordial path uses a stricter >2W/3 weighted quorum. A finalized checkpoint activates one immutable weight snapshot. PoR does not add or remove bonded validators or alter the current round-robin leader schedule."
    }
  ];

  const $ = id => document.getElementById(id);
  let state = engine.sample();
  let stage = 0;
  let recipient = 0;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function decimal(value, digits = 4) {
    return engine.format(value, digits);
  }

  function metric(label, value) {
    const node = element("div", "result-metric");
    node.append(element("span", "", label), element("strong", "", value));
    return node;
  }

  function renderInputs() {
    $("recipient-name").textContent = names[recipient];
    const recipients = $("recipient-buttons");
    recipients.replaceChildren();
    names.forEach((name, index) => {
      const button = element("button", "", name);
      button.type = "button";
      button.setAttribute("aria-pressed", String(index === recipient));
      button.addEventListener("click", () => {
        recipient = index;
        renderInputs();
        render();
      });
      recipients.append(button);
    });

    const ratings = $("rating-controls");
    ratings.replaceChildren();
    names.forEach((name, rater) => {
      if (rater === recipient) return;
      ratings.append(sliderRow(`rating-${recipient}-${rater}`, `${name} rates`, state.scores[recipient][rater], value => {
        state.scores[recipient][rater] = value;
        render();
      }));
    });

    const previous = $("previous-controls");
    previous.replaceChildren();
    names.forEach((name, index) => {
      previous.append(sliderRow(`previous-${index}`, name, state.previous[index], value => {
        state.previous[index] = value;
        render();
      }, 5));
    });

    $("alpha").value = String(state.alpha);
    $("equivocation").checked = state.equivocation;
    renderInputValues();
  }

  function sliderRow(id, labelText, value, onChange, min = 0) {
    const row = element("div", "slider-row");
    const label = element("label", "", labelText);
    label.htmlFor = id;
    const input = element("input");
    input.id = id;
    input.type = "range";
    input.min = String(min);
    input.max = "100";
    input.step = "5";
    input.value = String(value);
    const output = element("output", "", `${value}%`);
    output.htmlFor = id;
    input.addEventListener("input", () => {
      const next = Number(input.value);
      output.textContent = `${next}%`;
      onChange(next);
    });
    row.append(label, input, output);
    return row;
  }

  function renderInputValues() {
    $("alpha-output").textContent = `${state.alpha}%`;
  }

  function renderMatrix(values, label, cellText) {
    const wrap = element("div", "matrix-wrap");
    const table = element("table", "matrix");
    table.setAttribute("aria-label", label);
    const head = element("thead");
    const header = element("tr");
    header.append(element("th", "", "Recipient / rater"));
    names.forEach(name => header.append(element("th", "", name)));
    head.append(header);
    const body = element("tbody");
    values.forEach((row, i) => {
      const tr = element("tr");
      tr.append(element("th", "", names[i]));
      row.forEach((value, j) => {
        const cell = element("td", i === recipient && j !== recipient ? "focus-cell" : "", value === null ? "-" : cellText(value));
        if (value === null) cell.className = "empty";
        tr.append(cell);
      });
      body.append(tr);
    });
    table.append(head, body);
    wrap.append(table);
    return wrap;
  }

  function renderBars(values, max) {
    const list = element("div", "bar-list");
    values.forEach((value, i) => {
      const row = element("div", "bar-row");
      const track = element("div", "bar-track");
      const fill = element("span", names[i].toLowerCase());
      fill.style.width = `${Math.min(100, 100 * Number(value) / Number(max))}%`;
      track.append(fill);
      row.append(element("strong", "", names[i]), track, element("output", "", decimal(value)));
      list.append(row);
    });
    return list;
  }

  function renderComparison(before, after, beforeLabel, afterLabel) {
    const list = element("div", "comparison");
    const max = before.concat(after).reduce((a, b) => a > b ? a : b, engine.SCALE);
    names.forEach((name, i) => {
      const row = element("div", "comparison-row");
      row.append(element("strong", "", name));
      [[beforeLabel, before[i]], [afterLabel, after[i]]].forEach(([label, value], column) => {
        const block = element("div", "comparison-bar");
        const caption = element("label");
        caption.append(element("span", "", label), element("span", "", decimal(value)));
        const track = element("div", "bar-track");
        const fill = element("span", column === 1 && state.equivocation && i === 3 && stage === 4 ? "excluded" : name.toLowerCase());
        fill.style.width = `${Math.min(100, 100 * Number(value) / Number(max))}%`;
        track.append(fill);
        block.append(caption, track);
        row.append(block);
      });
      list.append(row);
    });
    return list;
  }

  function renderVisual(result) {
    const visual = $("visualization");
    visual.replaceChildren();
    const metrics = $("result-strip");
    metrics.replaceChildren();
    if (stage === 0) {
      metrics.append(metric("Accepted ratings in sample", "12"), metric("Selected recipient", names[recipient]));
      visual.append(element("div", "viz-heading", "Raw ratings (recipient rows, rater columns)"));
      visual.append(renderMatrix(state.scores, "Raw rating matrix", value => `${value}%`));
    } else if (stage === 1) {
      metrics.append(metric(`Min for ${names[recipient]}`, decimal(result.ranges[recipient].min, 2)), metric(`Max for ${names[recipient]}`, decimal(result.ranges[recipient].max, 2)));
      visual.append(element("div", "viz-heading", "Normalized ratings by recipient"));
      visual.append(renderMatrix(result.normalized, "Normalized rating matrix", value => decimal(value, 3)));
    } else if (stage === 2) {
      metrics.append(metric(`P[${names[recipient]}]`, decimal(result.contribution[recipient])), metric(`Previous R[${names[recipient]}]`, decimal(result.previous[recipient])));
      visual.append(element("div", "viz-heading", "Liquid-Rank contribution for every recipient"));
      const max = result.contribution.reduce((a, b) => a > b ? a : b, engine.SCALE);
      visual.append(renderBars(result.contribution, max));
      const terms = names.flatMap((name, j) => j === recipient ? [] : [`${decimal(result.normalized[recipient][j], 3)} x ${decimal(result.previous[j], 2)} (${name})`]);
      visual.append(element("p", "mini-note", `P[${names[recipient]}] = ${terms.join(" + ")} = ${decimal(result.contribution[recipient])}`));
    } else if (stage === 3) {
      metrics.append(metric("Alpha", decimal(result.alpha, 2)), metric(`Blended B[${names[recipient]}]`, decimal(result.blended[recipient])));
      visual.append(element("div", "viz-heading", "Previous reputation vs blended value"));
      visual.append(renderComparison(result.previous, result.blended, "Previous", "Blended"));
    } else if (stage === 4) {
      metrics.append(metric(`Clamped C[${names[recipient]}]`, decimal(result.clamped[recipient])), metric("D active weight", decimal(result.weights[3])));
      visual.append(element("div", "viz-heading", "Blended value vs active weight after clamp and optional penalty"));
      visual.append(renderComparison(result.blended, result.weights, "Blended", "Active"));
      const note = result.penalty
        ? `D's prior share: ${decimal(result.previous[3] * engine.SCALE / result.penalty.totalPrevious, 3)}. Penalty: ${decimal(result.penalty.rate, 2)}. Retained reputation: ${decimal(result.penalty.retained)}; active weight: 0. D remains in the bonded set.`
        : "No verified penalty event in this sample round. The clamped values become active reputations once the snapshot is finalized.";
      visual.append(element("p", "mini-note", note));
    } else {
      metrics.append(metric("Active total W", decimal(result.totalWeight)), metric("Strict threshold", `> ${decimal(result.totalWeight * 2n / 3n)}`));
      visual.append(element("div", "viz-heading", "Active weight projected to the four authorized validators"));
      const max = result.weights.reduce((a, b) => a > b ? a : b, engine.SCALE);
      visual.append(renderBars(result.weights, max));
      visual.append(element("p", "mini-note warn", "A quorum requires strictly more than two-thirds of this active total. One quorum check alone does not finalize a leader."));
    }
  }

  function render() {
    const result = engine.calculate(state);
    const description = stageDescriptions[stage];
    $("step-count").textContent = `${stage + 1} of ${stageNames.length}`;
    $("calculation-heading").textContent = stageNames[stage];
    $("stage-number").textContent = `STEP ${String(stage + 1).padStart(2, "0")}`;
    $("stage-summary").textContent = description.summary;
    $("equation").textContent = description.equation;
    $("paper-intention").textContent = description.paper;
    $("implemented-rule").textContent = description.implementation;
    [...$("stage-buttons").children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === stage)));
    renderInputValues();
    renderVisual(result);
  }

  stageNames.forEach((name, index) => {
    const button = element("button");
    button.type = "button";
    button.append(element("span", "", `STEP ${String(index + 1).padStart(2, "0")}`), document.createTextNode(name));
    button.addEventListener("click", () => { stage = index; render(); });
    $("stage-buttons").append(button);
  });
  $("alpha").addEventListener("input", event => { state.alpha = Number(event.target.value); render(); });
  $("equivocation").addEventListener("change", event => { state.equivocation = event.target.checked; render(); });
  $("reset").addEventListener("click", () => { state = engine.sample(); stage = 0; recipient = 0; renderInputs(); render(); });
  renderInputs();
  render();
})();
