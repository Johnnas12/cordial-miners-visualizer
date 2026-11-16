const test = require("node:test");
const assert = require("node:assert/strict");
const model = require("./lean_examples.js");

test("closure does not alone rule out a cycle", () => {
  const valid = model.insertionCase("valid");
  const missing = model.insertionCase("missing");
  const cyclic = model.insertionCase("cycle");
  assert.deepEqual([valid.closed, valid.cyclic, valid.validGrowth], [true, false, true]);
  assert.deepEqual([missing.closed, missing.cyclic, missing.validGrowth], [false, false, false]);
  assert.deepEqual([cyclic.closed, cyclic.cyclic, cyclic.validGrowth], [true, true, false]);
});

test("observation includes the selected block and transitive predecessors", () => {
  assert.deepEqual([...model.observedFrom("B").seen], ["B", "A", "G"]);
  assert.equal(model.observedFrom("C").seen.has("B"), false);
});

test("seeing both fork branches triggers the exclusion lemma", () => {
  assert.equal(model.exclusionCase(false).exclusionProven, false);
  assert.equal(model.exclusionCase(true).exclusionProven, true);
});

test("weighted quorums and honest-majority assumption use strict two thirds", () => {
  const within = model.quorumCase(1);
  assert.equal(within.bothQuorums, true);
  assert.equal(within.honestSupermajority, true);
  const outside = model.quorumCase(8);
  assert.equal(outside.bothQuorums, true);
  assert.equal(outside.honestSupermajority, false);
});

test("only the illustrated valid append retains the old tau prefix", () => {
  assert.equal(model.orderingCase("valid").prefix, true);
  assert.equal(model.orderingCase("outside").prefix, false);
  assert.equal(model.isPrefix(["A", "B"], ["A", "B", "C"]), true);
});

test("authorized slashing uses the previous snapshot and excludes D", () => {
  const isolated = model.slashingCase(40, true);
  assert.deepEqual([isolated.rate, isolated.retained, isolated.active, isolated.excluded], [25, 30, 0, true]);
  const correlated = model.slashingCase(60, true);
  assert.deepEqual([correlated.rate, correlated.retained], [100, 0]);
  const denied = model.slashingCase(40, false);
  assert.equal(denied.active, 40);
  assert.equal(denied.excluded, false);
});

test("negative trace examples are rejected", () => {
  assert.equal(model.traceCase("valid").verdict, "ACCEPT");
  assert.equal(model.traceCase("quorum").verdict, "REJECT");
  assert.equal(model.traceCase("order").verdict, "REJECT");
});
