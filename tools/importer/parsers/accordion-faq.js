/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: wknd-trendsetters FAQ — a .faq-list of <details.faq-item>, each with a
 * <summary.faq-question> (question) and a .faq-answer (answer body).
 * Structure: 2 columns, one row per item — question cell | answer cell.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll(':scope > .faq-item, :scope > details, details'));

  const cells = [];
  items.forEach((item) => {
    const summary = item.querySelector('summary, .faq-question');
    const answer = item.querySelector('.faq-answer');

    // Question: use inner text-bearing node if present, else the summary itself.
    const questionCell = [];
    if (summary) {
      const inner = summary.querySelector('span');
      questionCell.push(inner || document.createTextNode(summary.textContent.trim()));
    }

    const answerCell = [];
    if (answer) {
      Array.from(answer.children).forEach((node) => answerCell.push(node));
      if (!answerCell.length) answerCell.push(document.createTextNode(answer.textContent.trim()));
    }

    if (questionCell.length || answerCell.length) {
      cells.push([questionCell.length ? questionCell : '', answerCell.length ? answerCell : '']);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
