// Rola notações como "3d6+2", "d20", "2d10-1"
function parseAndRoll(notation) {
  const clean = String(notation).toLowerCase().replace(/\s/g, '');
  const match = clean.match(/^(\d*)d(\d+)([+-]\d+)?$/);
  if (!match) return null;
  const count = parseInt(match[1] || '1', 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;
  if (count < 1 || count > 1000 || sides < 2 || sides > 10000) return null;
  const rolls = [];
  for (let i = 0; i < count; i++) rolls.push(Math.floor(Math.random() * sides) + 1);
  const sum = rolls.reduce((a, b) => a + b, 0);
  const result = sum + modifier;
  return {
    rolls, modifier, result, count, sides,
    isCrit: count === 1 && rolls[0] === sides,
    isFumble: count === 1 && rolls[0] === 1,
  };
}

// Rolagem de d20 com vantagem/desvantagem
function rollD20(advantage = false, disadvantage = false, modifier = 0) {
  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  let chosen, dropped;
  if (advantage) { chosen = Math.max(r1, r2); dropped = Math.min(r1, r2); }
  else if (disadvantage) { chosen = Math.min(r1, r2); dropped = Math.max(r1, r2); }
  else { chosen = r1; dropped = null; }
  return {
    rolls: dropped !== null ? [r1, r2] : [r1],
    chosen, dropped, modifier,
    result: chosen + modifier,
    isCrit: chosen === 20,
    isFumble: chosen === 1,
  };
}

module.exports = { parseAndRoll, rollD20 };