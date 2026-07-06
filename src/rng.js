// For production you'd use a certified PRNG. Math.random is fine for learning.
export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function weightedPick(weights) {
  const roll = Math.random();
  let cumulative = 0;
  for (const [key, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (roll < cumulative) return key;
  }
  return Object.keys(weights)[0];
}
