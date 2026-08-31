/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: wknd-trendsetters article header — image column | text column
 * (breadcrumbs + heading + byline/meta).
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
    // Keep the full text column contents (breadcrumbs, heading, meta) in order.
    Array.from(textCol.children).forEach((node) => textCell.push(node));
  }

  if (!imageCell.length && !textCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  // Preserve source order (image typically first).
  if (imageCol && textCol && children.indexOf(textCol) < children.indexOf(imageCol)) {
    cells.push([textCell.length ? textCell : '', imageCell.length ? imageCell : '']);
  } else {
    cells.push([imageCell.length ? imageCell : '', textCell.length ? textCell : '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
