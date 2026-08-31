import { createOptimizedPicture } from '../../scripts/aem.js';

const MONTHS = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*';
const DATE_RE = new RegExp(`\\s*(${MONTHS}\\.?\\s+\\d{1,2}(?:,\\s*\\d{4})?)\\s*$`);

function buildMeta(p) {
  const raw = p.textContent.trim();
  const match = raw.match(DATE_RE);
  const meta = document.createElement('div');
  meta.className = 'cards-article-meta';

  const category = match ? raw.slice(0, match.index).trim() : raw;
  if (category) {
    const tag = document.createElement('span');
    tag.className = 'cards-article-tag';
    tag.textContent = category;
    meta.append(tag);
  }
  if (match) {
    const date = document.createElement('span');
    date.className = 'cards-article-date';
    date.textContent = match[1].trim();
    meta.append(date);
  }
  p.replaceWith(meta);
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });
    // split the meta paragraph (e.g. "Casual Cool May 12") into tag + date
    const body = li.querySelector('.cards-article-card-body');
    const metaP = body && body.querySelector('p');
    if (metaP) buildMeta(metaP);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
