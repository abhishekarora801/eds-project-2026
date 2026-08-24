const DEFAULT_SOURCE = '/query-index.json';
const DEFAULT_LIMIT = 12;

function readConfig(block) {
  const config = { source: DEFAULT_SOURCE, filter: '', limit: DEFAULT_LIMIT };
  block.querySelectorAll(':scope > div').forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length < 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    const val = cells[1].textContent.trim();
    if (key === 'source' && val) config.source = val;
    if (key === 'filter' && val) config.filter = val;
    if (key === 'limit' && val && !Number.isNaN(+val)) config.limit = +val;
  });
  return config;
}

function matches(path, filter) {
  if (!filter) return true;
  return filter.split(',').map((p) => p.trim()).filter(Boolean).some((pattern) => {
    if (pattern.endsWith('/**')) return path.startsWith(pattern.slice(0, -2));
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -1);
      return path.startsWith(prefix) && !path.slice(prefix.length).includes('/');
    }
    return path === pattern;
  });
}

function createCard({ path, title, description, image }) {
  const card = document.createElement('a');
  card.className = 'article-list-card';
  card.href = path;

  const media = document.createElement('div');
  media.className = 'article-list-media';
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = title || '';
    img.loading = 'lazy';
    media.append(img);
  }
  card.append(media);

  const body = document.createElement('div');
  body.className = 'article-list-body';
  const h = document.createElement('h3');
  h.className = 'article-list-title';
  h.textContent = title || path;
  body.append(h);
  if (description) {
    const p = document.createElement('p');
    p.className = 'article-list-description';
    p.textContent = description;
    body.append(p);
  }
  card.append(body);

  return card;
}

export default async function decorate(block) {
  const config = readConfig(block);
  block.textContent = '';

  let rows = [];
  try {
    const res = await fetch(config.source);
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    rows = json.data || [];
  } catch {
    block.textContent = 'Unable to load articles.';
    return;
  }

  const items = rows
    .filter((r) => matches(r.path || '', config.filter))
    .slice(0, config.limit);

  if (!items.length) {
    block.textContent = 'No articles found.';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'article-list-grid';
  items.forEach((item) => grid.append(createCard(item)));
  block.append(grid);
}
