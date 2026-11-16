const test = require("node:test");
const assert = require("node:assert/strict");
const por = require("./por_engine.js");

test("normalization uses recipient range and rejects self-ratings", () => {
  const result = por.calculate(por.sample());
  assert.equal(result.normalized[0][2], por.SCALE);
  assert.equal(result.normalized[0][3], 769_230_769n);
  assert.equal(result.normalized[0][0], null);

  const input = por.sample();
  input.scores[0][0] = 50;
  assert.throws(() => por.calculate(input), /self-rating/);
});

test("equal ratings normalize to one and alpha zero keeps previous reputation", () => {
  const input = por.sample();
  input.scores[0][1] = input.scores[0][2] = input.scores[0][3] = 50;
  input.alpha = 0;
  const result = por.calculate(input);
  assert.equal(result.normalized[0][1], por.SCALE);
  assert.deepEqual(result.blended, result.previous);
});

test("contribution sums normalized ratings times previous reputation", () => {
  const result = por.calculate(por.sample());
  const terms = result.normalized[0].reduce((sum, value, rater) =>
    value === null ? sum : sum + value * result.previous[rater], 0n);
  assert.equal(result.contribution[0], terms / por.SCALE);
  assert.ok(result.clamped.every(value => value >= 0n && value < por.SCALE));
});

test("verified equivocation ejects D and uses prior reputation for the base penalty", () => {
  const input = por.sample();
  input.equivocation = true;
  const result = por.calculate(input);
  assert.equal(result.penalty.rate, por.SCALE / 4n);
  assert.equal(result.penalty.retained, 225_000_000n);
  assert.equal(result.weights[3], 0n);
  assert.equal(result.clamped[3] > 0n, true);
});

test("above-threshold equivocating share triggers the full penalty", () => {
  const input = por.sample();
  input.previous = [5, 5, 5, 95];
  input.equivocation = true;
  const result = por.calculate(input);
  assert.equal(result.penalty.rate, por.SCALE);
  assert.equal(result.penalty.retained, 0n);
  assert.equal(result.weights[3], 0n);
});

test("sample and calculation leave source ratings unchanged", () => {
  const input = por.sample();
  const original = input.scores.map(row => row.slice());
  por.calculate(input);
  assert.deepEqual(input.scores, original);
  assert.deepEqual(por.sample().scores, original);
});
