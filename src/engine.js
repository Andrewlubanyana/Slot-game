import { SYMBOLS, REELS, PAYLINES, POTS, POT_WEIGHTS, COINS_TO_TRIGGER_BONUS } from './config.js';
import { randomInt, weightedPick } from './rng.js';

// Spin: pick a random position on each reel, return the 3 visible symbols
export function spin() {
  const grid = []; // grid[reel][row]
  for (let r = 0; r < REELS.length; r++) {
    const strip = REELS[r];
    const pos = randomInt(strip.length);
    const column = [
      strip[pos % strip.length],
      strip[(pos + 1) % strip.length],
      strip[(pos + 2) % strip.length]
    ];
    grid.push(column);
  }
  return grid;
}

// Evaluate line wins
export function evaluateLines(grid, bet) {
  const wins = [];
  for (let i = 0; i < PAYLINES.length; i++) {
    const line = PAYLINES[i];
    const firstSymbol = grid[0][line[0]];
    if (SYMBOLS[firstSymbol].special) continue; // coins don't pay on lines

    let count = 1;
    for (let r = 1; r < line.length; r++) {
      if (grid[r][line[r]] === firstSymbol) count++;
      else break;
    }

    if (count >= 3) {
      const multiplier = SYMBOLS[firstSymbol].pay[count - 1];
      if (multiplier > 0) {
        wins.push({
          line: i,
          symbol: firstSymbol,
          count,
          payout: (bet / PAYLINES.length) * multiplier
        });
      }
    }
  }
  return wins;
}

// Check for pot bonus trigger
export function evaluateBonus(grid, bet) {
  let coinCount = 0;
  for (const column of grid) {
    for (const symbol of column) {
      if (symbol === 'COIN') coinCount++;
    }
  }

  if (coinCount >= COINS_TO_TRIGGER_BONUS) {
    const potType = weightedPick(POT_WEIGHTS);
    return {
      triggered: true,
      coinCount,
      potType,
      payout: POTS[potType] * bet
    };
  }
  return { triggered: false, coinCount };
}

// One full spin resolution
export function resolveSpin(bet) {
  const grid = spin();
  const lineWins = evaluateLines(grid, bet);
  const bonus = evaluateBonus(grid, bet);
  const totalWin =
    lineWins.reduce((sum, w) => sum + w.payout, 0) +
    (bonus.triggered ? bonus.payout : 0);
  return { grid, lineWins, bonus, totalWin };
}
