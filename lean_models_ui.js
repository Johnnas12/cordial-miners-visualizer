(function () {
  "use strict";

  const examples = window.CordialLeanExamples;
  const repo = "https://github.com/iCog-Labs-Dev/cordial-f1r3node/blob/dev/";
  const models = [
    {
      title: "Blocklace", intro: "A valid blocklace grows by inserting fresh blocks whose predecessors are already present.",
      theorem: "insertPreservesClosed · directPred_acyclic",
      assumptions: "The old blocklace is valid; each new block is fresh and insertable with known predecessors.",
      conclusion: "Insertion preserves predecessor closure. Valid blocklace growth yields an acyclic predecessor relation.",
      rust: "blocklace.rs: insertion and missing-predecessor validation.",
      lean: "lean/LeanVerification/Blocklace.lean", leanExtra: "lean/LeanVerification/Observe.lean", rustPath: "crates/cordial-miners-core/src/blocklace.rs"
    },
    {
      title: "Observation", intro: "A block observes itself and every block reachable by following predecessor links backward.",
      theorem: "observeSet_equiv · observes_partialOrder",
      assumptions: "A valid blocklace with a well-founded predecessor relation.",
      conclusion: "The computed observation set agrees with reachability; observation is reflexive, transitive, and antisymmetric.",
      rust: "blocklace.rs: observe and predecessor traversal.",
      lean: "lean/LeanVerification/Observe.lean", rustPath: "crates/cordial-miners-core/src/blocklace.rs"
    },
    {
      title: "Equivocation", intro: "Two incomparable blocks by one creator form a fork. A block that acknowledges both cannot approve either branch.",
      theorem: "honest_chain_linearity · approves_exclusion",
      assumptions: "Both fork branches are present and incomparable; the candidate approver observes both.",
      conclusion: "That candidate cannot approve either conflicting branch. Honest creators' blocks form an observation chain.",
      rust: "cordiality.rs and approval.rs: fork detection and approval checks.",
      lean: "lean/LeanVerification/Approval.lean", leanExtra: "lean/LeanVerification/Equivocation.lean", rustPath: "crates/cordial-miners-core/src/consensus/approval.rs"
    },
    {
      title: "Finality", intro: "Two distinct leaders cannot both be finalized for the same wave under the model's honesty and quorum premises.",
      theorem: "no_conflicting_finals",
      assumptions: "Valid blocklace, same wave and leader selection, honest weight >2/3, and modeled approval, ratification, and super-ratification.",
      conclusion: "If two blocks both satisfy FinalLeader for that wave, their block IDs are equal.",
      rust: "finality.rs and cordiality.rs: weighted final-leader and quorum checks.",
      lean: "lean/LeanVerification/Finality.lean", rustPath: "crates/cordial-miners-core/src/consensus/finality.rs"
    },
    {
      title: "Tau ordering", intro: "The executable Lean reference orders approved blocks through finalized leaders and a deterministic topological sort.",
      theorem: "xsortRef_correct · tauRef_prefix_of_validBlocklaceGrowth",
      assumptions: "Valid growth, unchanged weights and sort key, stable earlier finality/ratification, a continuing finalized-leader chain, and checked plans/output.",
      conclusion: "A successful sort respects predecessor order; under the valid-growth evidence, old tau output remains a prefix.",
      rust: "ordering.rs: weighted tau, xsort, and ordered-prefix checks.",
      lean: "lean/LeanVerification/OrderingProofs.lean", rustPath: "crates/cordial-miners-core/src/consensus/ordering.rs"
    },
    {
      title: "Slashing", intro: "The slashing reference separates authorized evidence from penalty arithmetic and active-weight export.",
      theorem: "transition_exclusion_iff · exportedWeights_equiv",
      assumptions: "A valid prior snapshot, admitted candidate, structurally valid evidence, and explicit authentication and application authorization.",
      conclusion: "New exclusion requires an authorized event; excluded keys export zero active weight and stay excluded.",
      rust: "cordial-por: evidence, penalty transition, and authorized weight projection.",
      lean: "lean/LeanVerification/SlashingRef.lean", rustPath: "crates/cordial-por/src/transition.rs"
    },
    {
      title: "Trace bridge", intro: "An executable Lean reference replays selected Rust trace decisions and checks them against the model.",
      theorem: "checkFinal_iff · checkApproves_iff · trace replay",
      assumptions: "A canonical, supported trace and the model's explicit blocklace, weight, leader, and evidence inputs.",
      conclusion: "Selected Boolean checkers match their Lean predicates; a mismatched trace decision is rejected by conformance tests.",
      rust: "trace.rs: canonical consensus events; replay is a conformance check, not a proof of all Rust executions.",
      lean: "lean/LeanVerification/CMRef.lean", leanExtra: "lean/LeanVerification/Replay.lean", rustPath: "crates/cordial-miners-core/src/simulation/trace.rs"
    }
  ];

  const $ = id => document.getElementById(id);
  const ns = "http://www.w3.org/2000/svg";
  const state = { tab: 0, insertion: "valid", observed: "B", seesBoth: false, dWeight: 1, growth: "valid", previousD: 40, authorized: true, trace: "valid" };

  function node(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function svgElement(tag, attrs) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, String(value)));
    return element;
  }

  function svgCanvas(label) {
    const svg = svgElement("svg", { class: "proof-svg", viewBox: "0 0 760 330", role: "img", "aria-label": label });
    const defs = svgElement("defs", {});
    const marker = svgElement("marker", { id: "lean-arrow", markerWidth: 9, markerHeight: 8, refX: 8, refY: 4, orient: "auto", markerUnits: "strokeWidth" });
    marker.append(svgElement("path", { d: "M0 0 L9 4 L0 8 Z", fill: "#94a3b8" }));
    defs.append(marker);
    svg.append(defs);
    return svg;
  }

  function line(svg, x1, y1, x2, y2, color = "#94a3b8", dashed = false) {
    const edge = svgElement("line", { x1, y1, x2, y2, stroke: color, "stroke-width": 2, "marker-end": "url(#lean-arrow)" });
    if (dashed) edge.setAttribute("stroke-dasharray", "7 6");
    svg.append(edge);
  }

  function curve(svg, d, color = "#fb7185") {
    svg.append(svgElement("path", { d, fill: "none", stroke: color, "stroke-width": 2, "marker-end": "url(#lean-arrow)" }));
  }

  function diagramNode(svg, x, y, name, caption, color = "#38bdf8", hollow = false) {
    svg.append(svgElement("circle", { cx: x, cy: y, r: 30, fill: hollow ? "#111827" : "#182e43", stroke: color, "stroke-width": 3, "stroke-dasharray": hollow ? "6 5" : "none" }));
    const label = svgElement("text", { x, y: y + 5, "text-anchor": "middle", fill: "#f8fafc", "font-size": 16, "font-weight": 800 });
    label.textContent = name;
    svg.append(label);
    const sub = svgElement("text", { x, y: y + 55, "text-anchor": "middle", fill: "#a9b7ca", "font-size": 13 });
    sub.textContent = caption;
    svg.append(sub);
  }

  function svgWrap(svg, legend) {
    const wrap = node("div", "diagram-scroll");
    wrap.append(svg);
    const outer = node("div");
    outer.append(wrap, node("p", "diagram-legend", legend));
    return outer;
  }

  function flowCell(kicker, value, detail, tone = "") {
    const cell = node("div", `flow-cell ${tone}`);
    cell.append(node("span", "", kicker), node("strong", "", value), node("p", "", detail));
    return cell;
  }

  function choiceButtons(options, current, onChoose) {
    const controls = $("model-controls");
    options.forEach(([value, label]) => {
      const button = node("button", "", label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(current === value));
      button.addEventListener("click", () => { onChoose(value); renderExample(); });
      controls.append(button);
    });
  }

  function rangeControl(id, labelText, value, min, max, step, onInput) {
    const controls = $("model-controls");
    const label = node("label", "", labelText);
    label.htmlFor = id;
    const range = node("input");
    range.type = "range";
    range.id = id;
    range.min = String(min);
    range.max = String(max);
    range.step = String(step);
    range.value = String(value);
    const output = node("output", "", String(value));
    output.htmlFor = id;
    range.addEventListener("input", () => { output.textContent = range.value; onInput(Number(range.value)); renderExample(false); });
    controls.append(label, range, output);
  }

  function setOutcome(tone, title, detail) {
    const outcome = $("example-outcome");
    outcome.className = `example-outcome ${tone}`;
    outcome.textContent = title;
    $("example-detail").textContent = detail;
  }

  function drawBlocklace() {
    const result = examples.insertionCase(state.insertion);
    const svg = svgCanvas("Three block predecessor graph with an optional missing parent or cycle");
    line(svg, 296, 205, 132, 205);
    line(svg, 516, 143, 352, 193, result.cyclic ? "#fb7185" : "#94a3b8");
    if (state.insertion === "missing") line(svg, 515, 128, 351, 64, "#fb7185", true);
    if (state.insertion === "cycle") curve(svg, "M350 224 Q455 307 529 173");
    diagramNode(svg, 100, 205, "G", "genesis", "#a78bfa");
    diagramNode(svg, 320, 205, "A", "known parent", result.cyclic ? "#fb7185" : "#38bdf8");
    diagramNode(svg, 540, 135, "B", "new block", result.cyclic ? "#fb7185" : "#34d399");
    if (state.insertion === "missing") diagramNode(svg, 320, 55, "X", "not present", "#fb7185", true);
    $("model-diagram").append(svgWrap(svg, "Arrows point from a block to its direct predecessor."));
    if (result.validGrowth) setOutcome("good", "Valid insertion preserves closure and acyclicity", "Fresh B points only to A, already in the blocklace. The valid-construction premise holds in this example.");
    else if (!result.closed) setOutcome("bad", "Missing predecessor: closure fails", "X is absent. Lean's insertRequiresPredecessors shows this insertion cannot yield a closed blocklace.");
    else setOutcome("caution", "Closed does not mean acyclic", "Every pointer resolves, yet A and B form a cycle. This graph is outside ValidBlocklace's insertion construction, so its acyclicity theorem does not apply.");
  }

  function drawObservation() {
    const result = examples.observedFrom(state.observed);
    const svg = svgCanvas(`Observation cone of block ${state.observed}`);
    line(svg, 270, 170, 124, 170, result.seen.has("A") ? "#34d399" : "#64748b");
    line(svg, 486, 91, 341, 155, state.observed === "B" ? "#34d399" : "#64748b");
    line(svg, 486, 245, 341, 185, state.observed === "C" ? "#34d399" : "#64748b");
    diagramNode(svg, 90, 170, "G", "ancestor", result.seen.has("G") ? "#34d399" : "#64748b");
    diagramNode(svg, 310, 170, "A", "ancestor", result.seen.has("A") ? "#34d399" : "#64748b");
    diagramNode(svg, 520, 80, "B", "block B", result.seen.has("B") ? "#38bdf8" : "#64748b");
    diagramNode(svg, 520, 255, "C", "block C", result.seen.has("C") ? "#38bdf8" : "#64748b");
    $("model-diagram").append(svgWrap(svg, "Green is the selected block's predecessor cone; the selected block observes itself too."));
    setOutcome("good", `${state.observed} observes ${[...result.seen].join(", ")}`, "The finite observeSet checker agrees with the model's reflexive-transitive predecessor reachability on a valid blocklace.");
  }

  function drawEquivocation() {
    const result = examples.exclusionCase(state.seesBoth);
    const svg = svgCanvas("Two same-creator fork branches and one observer block");
    line(svg, 265, 79, 124, 155, "#fb7185");
    line(svg, 265, 251, 124, 185, "#fb7185");
    line(svg, 535, 153, 335, 89, "#38bdf8");
    if (result.seesBoth) line(svg, 535, 187, 335, 251, "#38bdf8");
    diagramNode(svg, 90, 170, "G", "common parent", "#a78bfa");
    diagramNode(svg, 300, 70, "E1", "creator E, depth 1", "#fb7185");
    diagramNode(svg, 300, 260, "E2", "creator E, depth 1", "#fb7185");
    diagramNode(svg, 565, 170, "O", "candidate approver", "#38bdf8");
    $("model-diagram").append(svgWrap(svg, "E1 and E2 share a creator and depth but do not observe one another."));
    if (result.exclusionProven) setOutcome("bad", "Approval excluded for both branches", "O observes E1 and E2. The approves_exclusion theorem rules out O approving either branch.");
    else setOutcome("caution", "Exclusion premise not yet met", "O observes only E1. This lemma does not establish approval or exclusion until O also acknowledges the conflicting branch.");
  }

  function drawFinality() {
    const result = examples.quorumCase(state.dWeight);
    const table = node("table", "weight-table");
    table.setAttribute("aria-label", "Validator weights and quorum membership");
    const head = node("thead");
    const heading = node("tr");
    ["Validator", "Weight", "Honest?", "Quorum 1", "Quorum 2"].forEach(text => heading.append(node("th", "", text)));
    head.append(heading);
    const body = node("tbody");
    ["A", "B", "C", "D"].forEach((name, index) => {
      const row = node("tr");
      [name, String(result.weights[index]), index === 3 ? "No" : "Yes", index === 2 ? "-" : "In", index === 1 ? "-" : "In"].forEach(value => row.append(node("td", "", value)));
      body.append(row);
    });
    table.append(head, body);
    const math = node("div", "math-strip", `Q1 = Q2 = ${result.support}/${result.total}; 3 x ${result.support} > 2 x ${result.total}. Honest = ${result.honest}/${result.total}; 3 x ${result.honest} ${result.honestSupermajority ? ">" : "<="} 2 x ${result.total}.`);
    const flow = node("div", "step-flow");
    flow.append(
      flowCell("First intersection", "A and D", "Both illustrative quorums overlap."),
      flowCell("Honest overlap", "A", "A has positive honest weight.", result.honestSupermajority ? "good" : "warn"),
      flowCell("Conditional theorem", "No conflicting finals", "The full proof also needs ratification, honest chains, and fork exclusion.")
    );
    $("model-diagram").append(table, math, flow);
    if (result.honestSupermajority) setOutcome("good", "Honest-weight premise holds in this example", "Both sample quorums exceed two-thirds and intersect at honest A. This illustrates one ingredient of the finalized-leader safety proof; it does not compute finality.");
    else setOutcome("caution", "Honest-weight premise fails", "The two sample quorums still pass, but honest weight is not above two-thirds. The no_conflicting_finals theorem cannot be invoked for this weight view.");
  }

  function drawOrdering() {
    const result = examples.orderingCase(state.growth);
    [["Old tau", result.oldOrder], ["New tau", result.newOrder]].forEach(([label, order], rowIndex) => {
      const row = node("div", "sequence-row");
      row.append(node("span", "", label));
      order.forEach((name, index) => row.append(node("b", `sequence-token ${rowIndex && index >= result.oldOrder.length ? "new" : rowIndex && result.oldOrder[index] !== name ? "conflict" : ""}`, name)));
      $("model-diagram").append(row);
    });
    const flow = node("div", "step-flow");
    flow.append(
      flowCell("Earlier leaders", state.growth === "valid" ? "Stable" : "Changed", "Prior finality and ratification must be stable."),
      flowCell("Canonical sort", "Predecessors first", "Ties use a fixed key; old parameters stay unchanged."),
      flowCell("Output", result.prefix ? "Old + suffix" : "Rewritten", result.prefix ? "New blocks extend the sequence." : "Outside the valid-growth contract.", result.prefix ? "good" : "warn")
    );
    $("model-diagram").append(flow);
    if (result.assumedValidGrowth) setOutcome("good", "Illustrated prefix is preserved", "The actual Lean theorem guarantees this only when its ValidBlocklaceGrowth evidence holds. This toy sequence assumes those premises rather than checking them.");
    else setOutcome("caution", "Arbitrary rewrite is outside the theorem", "The old order is no longer a prefix. This is an illustrative non-ValidAppend transition, not a counterexample to the Lean theorem.");
  }

  function drawSlashing() {
    const result = examples.slashingCase(state.previousD, state.authorized);
    const flow = node("div", "step-flow");
    flow.append(
      flowCell("Prior snapshot", `D = ${result.previousD}`, `Total prior active weight = ${result.total}.`),
      flowCell("Evidence gate", result.authorized ? "Authorized" : "Denied", result.authorized ? "Structural, crypto, and application checks are assumed satisfied." : "No authenticated and authorized event reaches the transition.", result.authorized ? "good" : "bad"),
      flowCell("Successor", result.authorized ? "D active = 0" : "No change", result.authorized ? `Penalty ${result.rate}%; retained ${result.retained}. Key excluded.` : `Prior active weight ${result.active} remains.`, result.authorized ? "warn" : "")
    );
    $("model-diagram").append(flow);
    $("model-diagram").append(node("div", "math-strip", `Equivocating share = ${result.previousD}/${result.total}. Tier = ${result.rate}%. Retained = floor(${result.previousD} x (1 - ${result.rate}/100)) = ${result.authorized ? result.retained : "not applied"}.`));
    if (result.authorized) setOutcome("good", "Authorized event excludes D from active weight", "The formal reference ties new exclusion to an authorized event and proves excluded keys export zero. Retained value is computed from the prior snapshot.");
    else setOutcome("bad", "Transition rejected without authorization", "The diagram leaves the previous state unchanged; an unauthenticated or unauthorized event is not evidence of a valid exclusion.");
  }

  function drawTrace() {
    const result = examples.traceCase(state.trace);
    const flow = node("div", "step-flow");
    flow.append(
      flowCell("Rust execution", result.event, "Canonical event and claimed decision."),
      flowCell("Lean reference", "Replay + check", "Reconstructs supported state and recomputes selected decisions."),
      flowCell("Conformance", result.verdict, result.reason, result.verdict === "ACCEPT" ? "good" : "bad")
    );
    $("model-diagram").append(flow);
    $("model-diagram").append(node("p", "diagram-legend", "This is a schematic of existing test cases, not a browser execution of Lean or a universal Rust refinement proof."));
    setOutcome(result.verdict === "ACCEPT" ? "good" : "bad", `${result.label}: ${result.verdict}`, result.reason);
  }

  const drawers = [drawBlocklace, drawObservation, drawEquivocation, drawFinality, drawOrdering, drawSlashing, drawTrace];

  function renderControls() {
    const controls = $("model-controls");
    controls.replaceChildren();
    if (state.tab === 0) choiceButtons([["valid", "Valid insertion"], ["missing", "Missing parent"], ["cycle", "Closed cycle"]], state.insertion, value => { state.insertion = value; });
    if (state.tab === 1) choiceButtons([["B", "Observe from B"], ["C", "Observe from C"]], state.observed, value => { state.observed = value; });
    if (state.tab === 2) choiceButtons([[false, "O sees one branch"], [true, "O sees both branches"]], state.seesBoth, value => { state.seesBoth = value; });
    if (state.tab === 3) rangeControl("d-weight", "Byzantine D weight", state.dWeight, 1, 12, 1, value => { state.dWeight = value; });
    if (state.tab === 4) choiceButtons([["valid", "Valid append example"], ["outside", "Arbitrary rewrite"]], state.growth, value => { state.growth = value; });
    if (state.tab === 5) {
      rangeControl("d-prior", "D prior reputation", state.previousD, 10, 100, 10, value => { state.previousD = value; });
      const label = node("label", "", "Evidence authorized");
      label.htmlFor = "authorized";
      const checkbox = node("input");
      checkbox.id = "authorized";
      checkbox.type = "checkbox";
      checkbox.checked = state.authorized;
      checkbox.addEventListener("change", () => { state.authorized = checkbox.checked; renderExample(false); });
      controls.append(checkbox, label);
    }
    if (state.tab === 6) choiceButtons([["valid", "Matching"], ["quorum", "Wrong quorum"], ["order", "Wrong tau order"]], state.trace, value => { state.trace = value; });
  }

  function renderExample(refreshControls = true) {
    if (refreshControls) renderControls();
    $("model-diagram").replaceChildren();
    drawers[state.tab]();
  }

  function renderTab() {
    const model = models[state.tab];
    $("model-count").textContent = `${state.tab + 1} of ${models.length}`;
    $("diagram-title").textContent = model.title;
    $("model-index").textContent = `MODEL ${String(state.tab + 1).padStart(2, "0")}`;
    $("model-intro").textContent = model.intro;
    $("proof-name").textContent = model.theorem;
    $("proof-assumptions").textContent = model.assumptions;
    $("proof-conclusion").textContent = model.conclusion;
    $("proof-rust").textContent = model.rust;
    $("lean-source").href = repo + model.lean;
    $("lean-extra").hidden = !model.leanExtra;
    if (model.leanExtra) $("lean-extra").href = repo + model.leanExtra;
    $("rust-source").href = repo + model.rustPath;
    [...$("model-tabs").children].forEach((button, index) => button.setAttribute("aria-pressed", String(index === state.tab)));
    renderExample();
  }

  models.forEach((model, index) => {
    const button = node("button");
    button.type = "button";
    button.append(node("small", "", `MODEL ${String(index + 1).padStart(2, "0")}`), document.createTextNode(model.title));
    button.addEventListener("click", () => { state.tab = index; renderTab(); });
    $("model-tabs").append(button);
  });
  renderTab();
})();
