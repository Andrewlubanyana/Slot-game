// Symbol definitions
export const SYMBOLS = {
  J:      { id: 'J',      name: 'Jack',   pay: [0, 0, 5, 10, 25] },
  Q:      { id: 'Q',      name: 'Queen',  pay: [0, 0, 5, 15, 30] },
  A:      { id: 'A',      name: 'Ace',    pay: [0, 0, 10, 20, 40] },
  DRAGON: { id: 'DRAGON', name: 'Dragon', pay: [0, 0, 20, 50, 150] },
  TIGER:  { id: 'TIGER',  name: 'Tiger',  pay: [0, 0, 30, 80, 250] },
  COIN:   { id: 'COIN',   name: 'Coin',   pay: [0, 0, 0, 0, 0], special: true }
};
// pay[n] = payout multiplier for n-of-a-kind (index 2 = 3 symbols, etc.)

// Reel strips — the sequence of symbols on each virtual reel
// Longer strips + fewer high-pay symbols = lower hit rate = higher volatility
export const REELS = [
  ['J','Q','A','J','DRAGON','Q','TIGER','A','J','COIN','Q','A','J','DRAGON','Q','A','J','TIGER','Q','A'],
  ['Q','A','J','DRAGON','Q','A','J','TIGER','Q','COIN','A','J','Q','DRAGON','A','J','Q','TIGER','A','J'],
  ['A','J','Q','TIGER','A','J','DRAGON','Q','A','COIN','J','Q','A','TIGER','J','Q','A','DRAGON','J','Q'],
  ['J','Q','A','DRAGON','J','Q','TIGER','A','J','COIN','Q','A','J','DRAGON','Q','A','J','TIGER','Q','A'],
  ['Q','A','J','TIGER','Q','A','DRAGON','J','Q','COIN','A','J','Q','TIGER','A','J','Q','DRAGON','A','J']
];

// Paylines — each is [row on reel1, row on reel2, ...] (0 = top, 2 = bottom)
export const PAYLINES = [
  [1,1,1,1,1], // middle
  [0,0,0,0,0], // top
  [2,2,2,2,2], // bottom
  [0,1,2,1,0], // V
  [2,1,0,1,2], // ^
  [1,0,0,0,1],
  [1,2,2,2,1],
  [0,0,1,2,2],
  [2,2,1,0,0],
  [1,0,1,2,1]
];

// Pot bonus prizes (multipliers of bet)
export const POTS = {
  MINI:  15,   // 7.50 at 0.50 bet
  MINOR: 30,   // 15.00
  MAJOR: 100,  // 50.00
  GRAND: 2000  // 1000.00
};

// Weighted pot selection (must sum to 1)
export const POT_WEIGHTS = {
  MINI:  0.70,
  MINOR: 0.22,
  MAJOR: 0.075,
  GRAND: 0.005
};

export const COINS_TO_TRIGGER_BONUS = 6;
