/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-contact. Base: columns.
 * Source: wknd-trendsetters FAQ contact section —
 * text column (heading + intro paragraph) | contact list column
 * (Email/Phone/Address as h3 label + link/text).
 * Structure: 2-column single row (text | contact list).
 */
export default function parse(element, { document }) {
  const children = Array.from(element.children).filter((c) => c.nodeType === 1);

  // Contact column is the one containing the label/value items (mailto/tel links or h3 labels).
  const contactCol = children.find((c) => c.querySelector('a[href^="mailto:"], a[href^="tel:"], .contact-items'));
  const textCol = children.find((c) => c !== contactCol);

  const textCell = [];
  if (textCol) {
    Array.from(textCol.children).forEach((node) => textCell.push(node));
  }

  const contactCell = [];
  if (contactCol) {
    // Preserve each label/value item (h3 + link/text) in order.
    const items = contactCol.querySelector('.contact-items') || contactCol;
    Array.from(items.children).forEach((item) => {
      Array.from(item.children).forEach((node) => contactCell.push(node));
    });
    // Fallback if structure differs.
    if (!contactCell.length) {
      Array.from(contactCol.children).forEach((node) => contactCell.push(node));
    }
  }

  if (!textCell.length && !contactCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (textCol && contactCol && children.indexOf(contactCol) < children.indexOf(textCol)) {
    cells.push([contactCell.length ? contactCell : '', textCell.length ? textCell : '']);
  } else {
    cells.push([textCell.length ? textCell : '', contactCell.length ? contactCell : '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
