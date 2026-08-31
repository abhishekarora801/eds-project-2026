/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns.
 * Source: wknd-trendsetters cards-showcase feature promo —
 * image column | text column (heading + paragraph + CTA).
 * Structure: 2-column single row (image | text).
 */
export default function parse(element, { document }) {
  const children = Array.from(element.children).filter((c) => c.nodeType === 1);

  const imageCol = children.find((c) => c.querySelector('img'));
  const textCol = children.find((c) => c !== imageCol);

  const imageCell = [];
  if (imageCol) {
    Array.from(imageCol.querySelectorAll('img')).forEach((img) => imageCell.push(img));
  }

  const textCell = [];
  if (textCol) {
    const heading = textCol.querySelector('h1, h2, h3, [class*="heading"]');
    const desc = textCol.querySelector('p, .paragraph-lg, [class*="paragraph"]');
    const ctas = Array.from(textCol.querySelectorAll('a.button, .button-group a, a'));
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    ctas.forEach((a) => textCell.push(a));
  }

  if (!imageCell.length && !textCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (imageCol && textCol && children.indexOf(textCol) < children.indexOf(imageCol)) {
    cells.push([textCell.length ? textCell : '', imageCell.length ? imageCell : '']);
  } else {
    cells.push([imageCell.length ? imageCell : '', textCell.length ? textCell : '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
