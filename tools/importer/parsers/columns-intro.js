/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-intro. Base: columns.
 * Source: wknd-trendsetters content-landing / listing-index / faq / cards-showcase hero intro.
 * Structure: 2-column single row — text column (heading + subheading + CTAs) | image column.
 */
export default function parse(element, { document }) {
  // The grid has two direct children: text block and image block (order may vary).
  const children = Array.from(element.children).filter((c) => c.nodeType === 1);

  // Identify which child holds the images vs the text.
  let imageCol = children.find((c) => c.querySelector('img'));
  let textCol = children.find((c) => c !== imageCol);

  const leftCell = [];
  const rightCell = [];

  if (textCol) {
    const heading = textCol.querySelector('h1, h2, h3, [class*="heading"]');
    const desc = textCol.querySelector('p, .subheading, [class*="subheading"]');
    const ctas = Array.from(textCol.querySelectorAll('a.button, .button-group a, a'));
    if (heading) leftCell.push(heading);
    if (desc) leftCell.push(desc);
    ctas.forEach((a) => leftCell.push(a));
  }

  if (imageCol) {
    const imgs = Array.from(imageCol.querySelectorAll('img'));
    imgs.forEach((img) => rightCell.push(img));
  }

  const cells = [];
  // Preserve visual order: text first if it appears before image, else image first.
  if (textCol && imageCol && children.indexOf(imageCol) < children.indexOf(textCol)) {
    cells.push([rightCell.length ? rightCell : '', leftCell.length ? leftCell : '']);
  } else {
    cells.push([leftCell.length ? leftCell : '', rightCell.length ? rightCell : '']);
  }

  if (!leftCell.length && !rightCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro', cells });
  element.replaceWith(block);
}
