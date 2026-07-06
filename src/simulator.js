import { resolveSpin } from './engine.js';

export function simulate(spins = 1_000_000, bet = 1) {
  let totalBet = 0;
  let totalWin = 0;
  let bonusHits = 0;
  let biggestWin = 0;

  for (let i = 0; i < spins; i++) {
    totalBet += bet;
    const result = resolveSpin(bet);
    totalWin += result.totalWin;
    if (result.bonus.triggered) bonusHits++;
    if (result.totalWin > biggestWin) biggestWin = result.totalWin;
  }

  return {
    spins,
    rtp: ((totalWin / totalBet) * 100).toFixed(2) + '%',
    bonusHitRate: `1 in ${Math.round(spins / bonusHits)}`,
    biggestWin: biggestWin.toFixed(2) + 'x bet'
  };
}

// Run in browser console: simulate(100000)
window.simulate = simulate;
