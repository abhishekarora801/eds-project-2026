/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: wknd-trendsetters closing CTA — a relative container with a background
 * cover-image and an overlaid .card-body (heading + subheading + CTA button).
 * Structure: 1 column, up to 3 rows — [block name] / [background image] / [content].
 */
export default function parse(element, { document }) {
  // Background image: the cover/overlay image (not images inside the text body).
  const bgImage = element.querySelector(':scope > img, img.utility-overlay, img[class*="overlay"], img.cover-image');

  const body = element.querySelector('.card-body') || element;
  const heading = body.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = body.querySelector('p, .subheading, [class*="subheading"]');
  const ctas = Array.from(body.querySelectorAll('a.button, .button-group a, a'));

  const cells = [];

  // Row 2: background image (optional).
  if (bgImage) cells.push([bgImage]);

  // Row 3: overlay content — single cell holding all elements.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  ctas.forEach((a) => contentCell.push(a));

  if (!contentCell.length && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  if (contentCell.length) cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
