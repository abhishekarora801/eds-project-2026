/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-trend. Base: cards.
 * Source: wknd-trendsetters trend grid — each card is an <a> wrapping
 * an image + body (tag + heading + description). The card href is preserved.
 * Structure: 2 columns, one row per card — image cell | body cell.
 * The whole card body is kept and a distinct CTA link (card href + title) is
 * appended so each row is unique (prevents md-conversion row de-duplication
 * that occurs when every card links to the same URL).
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.children).filter((c) => c.nodeType === 1);

  const cells = [];
  cards.forEach((card) => {
    const img = card.querySelector('img');
    const href = card.getAttribute('href')
      || (card.querySelector('a') && card.querySelector('a').getAttribute('href'));

    const body = card.querySelector('.trend-card-body') || card;
    const bodyCell = [];
    let title = '';
    Array.from(body.children).forEach((node) => {
      const heading = node.matches('h1, h2, h3, h4, h5, h6, [class*="heading"]')
        ? node
        : node.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
      if (heading && !title) title = heading.textContent.trim();
      bodyCell.push(node);
    });

    // Append a distinct CTA anchor so each row's content is unique.
    if (href) {
      const cta = document.createElement('p');
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = title || 'Read more';
      cta.append(link);
      bodyCell.push(cta);
    }

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
