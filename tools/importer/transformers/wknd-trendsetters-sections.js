/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks + Section Metadata.
 *
 * Template-agnostic: reads payload.template.sections (from page-templates.json)
 * so it drives all 5 templates by their own section list/counts
 * (content-landing 7, listing-index 4, blog-article 2, faq-page 4, cards-showcase 4).
 *
 * Behavior per reference implementation:
 *   - Insert an <hr> break before every section except the first (beforeTransform,
 *     while every section element still exists — parsers replace section elements
 *     between the hooks). A marker attribute on the <hr> keeps a stable anchor for
 *     styled sections whose original element gets replaced by a parser.
 *   - Emit a "Section Metadata" block (Style: <value>) after each section whose
 *     `style` is non-null (afterTransform). sections with style === null get no metadata.
 *     WKND styles used: "secondary" and "accent".
 *   - Reverse iteration in both hooks so inserts never shift not-yet-processed sections.
 *
 * Section selectors come directly from page-templates.json (DOM-verified during
 * page analysis) — not re-derived here.
 */

const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = (payload.template && payload.template.sections) || [];

  if (hookName === 'beforeTransform') {
    // Insert breaks now, before parsers can replace any section element.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no leading break, no metadata
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue; // selector didn't match on this page — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    // Parsers have run and may have replaced section elements. Anchor each styled
    // section's Section Metadata to whichever survives: the marker <hr> or the
    // original element.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || element.querySelector(section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { Style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}
