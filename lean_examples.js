(function (root) {
  "use strict";

  function insertionCase(kind) {
    const parents = kind === "missing"
      ? { G: [], A: ["G"], B: ["A", "X"] }
      : kind === "cycle"
        ? { G: [], A: ["G", "B"], B: ["A"] }
        : { G: [], A: ["G"], B: ["A"] };
    const closed = Object.values(parents).every(list => list.every(parent => parent in parents));
    const visited = new Set();
    const active = new Set();
    function hasCycle(block) {
      if (active.has(block)) return true;
      if (visited.has(block)) return false;
      active.add(block);
      for (const parent of parents[block]) {
        if (parent in parents && hasCycle(parent)) return true;
      }
      active.delete(block);
      visited.add(block);
      return false;
    }
    const cyclic = Object.keys(parents).some(hasCycle);
    return { parents, closed, cyclic, validGrowth: kind === "valid" };
  }

  function observedFrom(block) {
    const parents = { G: [], A: ["G"], B: ["A"], C: ["A"] };
    if (!(block in parents)) throw new RangeError("unknown block");
    const seen = new Set();
    function walk(id) {
      if (seen.has(id)) return;
      seen.add(id);
      parents[id].forEach(walk);
    }
    walk(block);
    return { parents, seen };
  }

  function exclusionCase(seesBoth) {
    return { seesBoth: Boolean(seesBoth), exclusionProven: Boolean(seesBoth) };
  }

  function quorumCase(byzantineWeight) {
    if (!Number.isInteger(byzantineWeight) || byzantineWeight < 1 || byzantineWeight > 12) {
      throw new RangeError("D weight must be an integer from 1 to 12");
    }
    const total = 9 + byzantineWeight;
    const support = 6 + byzantineWeight;
    const honest = 9;
    return {
      weights: [3, 3, 3, byzantineWeight], total, support, honest,
      bothQuorums: 3 * support > 2 * total,
      honestSupermajority: 3 * honest > 2 * total,
      honestIntersection: ["A"]
    };
  }

  function isPrefix(previous, next) {
    return previous.length <= next.length && previous.every((value, index) => value === next[index]);
  }

  function orderingCase(kind) {
    const oldOrder = ["G", "A", "B"];
    const newOrder = kind === "outside"
      ? ["G", "B", "A", "C", "D"]
      : ["G", "A", "B", "C", "D"];
    return { oldOrder, newOrder, prefix: isPrefix(oldOrder, newOrder), assumedValidGrowth: kind === "valid" };
  }

  function slashingCase(previousD, authorized) {
    if (!Number.isInteger(previousD) || previousD < 10 || previousD > 100) {
      throw new RangeError("previous reputation must be an integer from 10 to 100");
    }
    const total = 100 + previousD;
    const rate = 100 * previousD <= 30 * total ? 25 : 100;
    return {
      previousD, total, rate, authorized: Boolean(authorized),
      retained: authorized ? Math.floor(previousD * (100 - rate) / 100) : 0,
      active: authorized ? 0 : previousD,
      excluded: Boolean(authorized)
    };
  }

  function traceCase(kind) {
    const cases = {
      valid: { label: "Matching decisions", verdict: "ACCEPT", event: "compute_finality / run_tau_order", reason: "Reference checks agree on this illustrative trace." },
      quorum: { label: "Insufficient quorum", verdict: "REJECT", event: "build_threshold_certificate", reason: "Claimed support is below the strict weighted threshold." },
      order: { label: "Incorrect tau order", verdict: "REJECT", event: "run_tau_order", reason: "Claimed block order differs from the reference output." }
    };
    if (!(kind in cases)) throw new RangeError("unknown trace case");
    return cases[kind];
  }

  const api = { insertionCase, observedFrom, exclusionCase, quorumCase, isPrefix, orderingCase, slashingCase, traceCase };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.CordialLeanExamples = api;
})(typeof window !== "undefined" ? window : null);
