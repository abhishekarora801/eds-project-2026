/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: wknd-trendsetters testimonials — a .tabs-content list of .tab-pane panels
 * and a separate .tab-menu list of buttons. Pair each panel with its menu button by index.
 * Structure: 2 columns, one row per tab — label cell | content (panel) cell.
 */
export default function parse(element, { document }) {
  const panels = Array.from(element.querySelectorAll('.tabs-content > .tab-pane, .tab-pane'));
  const buttons = Array.from(element.querySelectorAll('.tab-menu > .tab-menu-link, .tab-menu-link'));

  const cells = [];
  panels.forEach((panel, i) => {
    const button = buttons[i];

    // Build the tab label cell from the button contents (name + role).
    const labelCell = [];
    if (button) {
      // Use the button's inner content nodes (avatar image + name/title text).
      const inner = button.firstElementChild || button;
      Array.from(inner.children).forEach((node) => labelCell.push(node));
      if (!labelCell.length) labelCell.push(document.createTextNode(button.textContent.trim()));
    } else {
      labelCell.push(document.createTextNode(`Tab ${i + 1}`));
    }

    // Content cell: the full panel content.
    const contentCell = [];
    Array.from(panel.children).forEach((node) => contentCell.push(node));

    cells.push([labelCell, contentCell.length ? contentCell : '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
