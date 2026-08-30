/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: wknd-trendsetters latest-articles grid — each card is an <a> wrapping
 * an image + body (tag/date meta + heading). The card href must be preserved.
 * Structure: 2 columns, one row per card — image cell | body cell.
 * The card link is preserved as a CTA anchor appended to the body cell.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.children).filter((c) => c.nodeType === 1);

  const cells = [];
  cards.forEach((card) => {
    const img = card.querySelector('img');

    const bodyCell = [];
    const body = card.querySelector('.article-card-body') || card;
    const href = card.getAttribute('href') || (card.querySelector('a') && card.querySelector('a').getAttribute('href'));

    Array.from(body.children).forEach((node) => {
      // Preserve the card link by wrapping the heading text in an anchor (no duplicate text).
      const heading = node.matches('h1, h2, h3, h4, [class*="heading"]') ? node : node.querySelector('h1, h2, h3, h4, [class*="heading"]');
      if (href && heading && !heading.querySelector('a')) {
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.textContent = heading.textContent.trim();
        heading.textContent = '';
        heading.append(link);
      }
      bodyCell.push(node);
    });

    if (img || bodyCell.length) {
      cells.push([img || '', bodyCell.length ? bodyCell : '']);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
