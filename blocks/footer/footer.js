import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Group each heading + its following list into a column wrapper so the
  // link columns (Trends / Inspire / Explore) lay out side-by-side.
  footer.querySelectorAll('.default-content-wrapper').forEach((wrapper) => {
    const headings = [...wrapper.querySelectorAll(':scope > h2')];
    if (headings.length < 2) return; // only the multi-column link section
    wrapper.classList.add('footer-columns');
    headings.forEach((h) => {
      const col = document.createElement('div');
      col.className = 'footer-column';
      h.replaceWith(col);
      col.append(h);
      let next = col.nextElementSibling;
      while (next && next.tagName !== 'H2' && !next.classList.contains('footer-column')) {
        const move = next;
        next = next.nextElementSibling;
        col.append(move);
      }
    });
  });

  block.append(footer);
}
