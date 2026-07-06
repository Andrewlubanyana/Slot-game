import { resolveSpin } from './engine.js';
import './simulator.js';

const SYMBOL_COLORS = {
  J: '#4a90e2', Q: '#2ecc71', A: '#e67e22',
  DRAGON: '#f1c40f', TIGER: '#e74c3c', COIN: '#ffd700'
};

const canvas = document.getElementById('reels');
const ctx = canvas.getContext('2d');
const CELL = 100;

let balance = 100;
const bet = 1;

function draw(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < 5; r++) {
    for (let row = 0; row < 3; row++) {
      const sym = grid[r][row];
      ctx.fillStyle = SYMBOL_COLORS[sym];
      ctx.fillRect(r * CELL + 5, row * CELL + 5, CELL - 10, CELL - 10);
      ctx.fillStyle = 'black';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sym, r * CELL + CELL/2, row * CELL + CELL/2 + 7);
    }
  }
}

// Initial empty grid
draw([['J','Q','A'],['Q','A','J'],['A','J','Q'],['J','Q','A'],['Q','A','J']]);

document.getElementById('spin-btn').addEventListener('click', () => {
  if (balance < bet) { alert('Out of balance!'); return; }
  balance -= bet;

  const result = resolveSpin(bet);
  draw(result.grid);
  balance += result.totalWin;

  document.getElementById('balance').textContent = balance.toFixed(2);
  document.getElementById('win').textContent = result.totalWin.toFixed(2);

  let msg = '';
  if (result.bonus.triggered) {
    msg = `🎉 ${result.bonus.potType} POT! Won ${result.bonus.payout.toFixed(2)}`;
  } else if (result.lineWins.length > 0) {
    msg = `Won ${result.totalWin.toFixed(2)} on ${result.lineWins.length} line(s)`;
  }
  document.getElementById('message').textContent = msg;
});
