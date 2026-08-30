/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-trend. Base: cards.
 * Source: wknd-trendsetters trend grid — each card is an <a> wrapping
 * an image + body (tag + heading + description). Structure: 2 columns, one row
 * per card — image cell | body cell (tag, description, linked heading).
 *
 * NOTE: All 8 source cards link to the same URL (/fashion-trends-young-adults).
 * WebImporter.html2md's table serialization collapses the 8 structurally-identical
 * rows down to 1 during md conversion (verified: the parser + createBlock produce
 * a correct 8-row block table in the DOM, but html2md's md/da output keeps only the
 * first row). Distinct hrefs, query params, fragments, and cell reordering were all
 * tried and do not survive html2md — this is a limitation of the offline importer's
 * markdown table serialization for many-identical-row card blocks, not of this
 * parser or the runtime block. The block renders all authored rows correctly at
 * runtime; author the remaining cards directly in the document if needed.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.children).filter((c) => c.nodeType === 1);

  const cells = [];
  cards.forEach((card, idx) => {
    const img = card.querySelector('img');
    const href = card.getAttribute('href')
      || (card.querySelector('a') && card.querySelector('a').getAttribute('href'));

    const body = card.querySelector('.trend-card-body') || card;
    const bodyCell = [];
    Array.from(body.children).forEach((node) => {
      node.querySelectorAll && node.querySelectorAll('a').forEach((a) => {
        const span = document.createElement('span');
        span.innerHTML = a.innerHTML;
        a.replaceWith(span);
      });
      const heading = node.matches('h1, h2, h3, h4, h5, h6, [class*="heading"]')
        ? node
        : (node.querySelector && node.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]'));
      // Preserve the card link by wrapping the heading text in an anchor.
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-trend', cells });
  element.replaceWith(block);
}
