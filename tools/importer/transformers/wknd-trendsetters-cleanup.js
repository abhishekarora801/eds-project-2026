/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 *
 * Removes non-authorable site chrome. All selectors verified against the
 * captured DOM in migration-work/{template}/cleaned.html (identical chrome
 * across all 5 templates):
 *   - a.skip-link  -> "Skip to main content" jump link (body > a.skip-link)
 *   - div.navbar   -> top navigation shell (contains logo, <nav id="nav-menu">, mega menu)
 *   - footer.footer-> site footer (<footer class="footer inverse-footer">, contains <nav>)
 *
 * NOTE: bare header/nav/footer selectors are intentionally NOT used.
 *   - #main-content contains <header class="section secondary-section"> which is
 *     authorable hero content (columns-intro) and must be preserved.
 *   - <nav> appears only inside div.navbar and footer.footer, so scoping to those
 *     wrappers removes it without a bare `nav` selector.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome. Scoped selectors from captured DOM.
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      'div.navbar',
      'footer.footer',
    ]);
  }
}
