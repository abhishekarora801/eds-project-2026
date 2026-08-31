/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: wknd-trendsetters snapshot gallery — image-only cards.
 * Structure: N rows, each with a single image cell (one column).
 */
export default function parse(element, { document }) {
  const children = Array.from(element.children).filter((c) => c.nodeType === 1);

  const cells = [];
  children.forEach((card) => {
    const img = card.querySelector('img');
    if (img) cells.push([img]);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
