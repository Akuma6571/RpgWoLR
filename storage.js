const fs = require('node:fs');
const path = require('node:path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function guildFile(guildId) {
  return path.join(DATA_DIR, `${guildId}.json`);
}

function loadGuild(guildId) {
  const file = guildFile(guildId);
  if (!fs.existsSync(file)) {
    return { characters: {}, activeCombats: {}, config: { prefix: '!' } };
  }
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return {
      characters: data.characters || {},
      activeCombats: data.activeCombats || {},
      config: data.config || { prefix: '!' },
    };
  } catch {
    return { characters: {}, activeCombats: {}, config: { prefix: '!' } };
  }
}

function saveGuild(guildId, data) {
  fs.writeFileSync(guildFile(guildId), JSON.stringify(data, null, 2));
}

function slug(name) {
  return String(name).toLowerCase().trim().replace(/\s+/g, '-');
}

function charKey(userId, name) {
  return `${userId}:${slug(name)}`;
}

module.exports = { loadGuild, saveGuild, slug, charKey };