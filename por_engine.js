(function (root) {
  "use strict";

  const SCALE = 1_000_000_000n;
  const VALIDATORS = ["A", "B", "C", "D"];
  const DEFAULT_SCORES = [
    [null, 80, 90, 60],
    [70, null, 80, 50],
    [90, 70, null, 80],
    [40, 50, 20, null]
  ];

  function sample() {
    return {
      scores: DEFAULT_SCORES.map(row => row.slice()),
      previous: [70, 60, 80, 30],
      alpha: 60,
      equivocation: false
    };
  }

  function percentage(value) {
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      throw new RangeError("demo percentages must be integers from 0 to 100");
    }
    return BigInt(value) * SCALE / 100n;
  }

  function integerSqrt(value) {
    if (value < 0n) throw new RangeError("square root of a negative value");
    if (value < 2n) return value;
    let result = value;
    let next = (result + 1n) / 2n;
    while (next < result) {
      result = next;
      next = (result + value / result) / 2n;
    }
    return result;
  }

  function clamp(value) {
    if (value === 0n) return 0n;
    const denominator = integerSqrt(SCALE * SCALE + value * value);
    return (value * SCALE + denominator / 2n) / denominator;
  }

  function calculate(input) {
    if (!Array.isArray(input.scores) || input.scores.length !== 4 ||
        !Array.isArray(input.previous) || input.previous.length !== 4) {
      throw new RangeError("demo requires four recipients and four previous reputations");
    }
    const previous = input.previous.map(percentage);
    const alpha = percentage(input.alpha);
    const raw = input.scores.map((row, recipient) => {
      if (!Array.isArray(row) || row.length !== 4) throw new RangeError("invalid rating row");
      return row.map((score, rater) => {
        if (recipient === rater) {
          if (score !== null) throw new RangeError("self-rating is not allowed");
          return null;
        }
        return percentage(score);
      });
    });

    const ranges = [];
    const normalized = raw.map(row => {
      const ratings = row.filter(value => value !== null);
      const min = ratings.reduce((a, b) => a < b ? a : b);
      const max = ratings.reduce((a, b) => a > b ? a : b);
      ranges.push({ min, max });
      return row.map(value => value === null ? null :
        ((value - min + SCALE) * SCALE) / (max - min + SCALE));
    });

    const contribution = normalized.map(row =>
      row.reduce((sum, score, rater) =>
        score === null ? sum : sum + score * previous[rater], 0n) / SCALE);
    const blended = contribution.map((value, recipient) =>
      (alpha * value + (SCALE - alpha) * previous[recipient]) / SCALE);
    const clamped = blended.map(clamp);
    const weights = clamped.slice();
    const retained = [0n, 0n, 0n, 0n];
    let penalty = null;

    if (input.equivocation) {
      const offender = 3;
      const totalPrevious = previous.reduce((sum, value) => sum + value, 0n);
      if (totalPrevious === 0n) throw new RangeError("no prior reputation to slash");
      const threshold = 30n * SCALE / 100n;
      const rate = previous[offender] * SCALE <= totalPrevious * threshold
        ? 25n * SCALE / 100n : SCALE;
      retained[offender] = previous[offender] * (SCALE - rate) / SCALE;
      weights[offender] = 0n;
      penalty = { offender, totalPrevious, rate, retained: retained[offender] };
    }

    return {
      raw, ranges, normalized, previous, alpha, contribution, blended,
      clamped, weights, retained, penalty,
      totalWeight: weights.reduce((sum, value) => sum + value, 0n)
    };
  }

  function format(value, digits = 4) {
    const divisor = 10n ** BigInt(digits);
    const rounded = (value * divisor + SCALE / 2n) / SCALE;
    return `${rounded / divisor}.${String(rounded % divisor).padStart(digits, "0")}`;
  }

  const api = { SCALE, VALIDATORS, sample, calculate, format, integerSqrt };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.CordialPorDemo = api;
})(typeof window !== "undefined" ? window : null);
