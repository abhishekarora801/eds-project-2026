# WKND Trendsetters — Site Scope & Template Catalog

**Site:** https://www.wknd-trendsetters.site
**Generated:** 2026-08-30
**URL discovery method:** crawl (sitemap unavailable)
**Coverage:** 15 of 15 pages analyzed (100%), 0 failures
**Locales:** 1 (en)

## Summary

| Metric | Value |
|--------|-------|
| Published pages | 15 |
| Page templates | 5 |
| Block variants | 22 (11 EDS-mapped, 11 custom/unknown) |
| Total block instances | 51 |

The site is a fashion editorial/blog built on Edge Delivery Services. Content
divides into a marketing landing layout, listing/index pages, a large set of
blog article detail pages, an FAQ page, and a card-showcase page. A shared
header and footer appear site-wide (auto-populated, not counted as content
blocks).

---

## 1. Templates

Each unique page template with a representative page and the pages that share it.

### `content-landing` — 3 pages
Marketing/landing page: side-by-side hero intro followed by several full-width
content sections (text + image groups, galleries, testimonials, CTA).

- **Representative:** https://www.wknd-trendsetters.site/
- https://www.wknd-trendsetters.site/fashion-trends-of-the-season
- https://www.wknd-trendsetters.site/fashion-trends-young-adults

### `listing-index` — 3 pages
Index/listing page: hero header followed by centered section headings and
multi-column card grids linking to detail pages.

- **Representative:** https://www.wknd-trendsetters.site/blog
- https://www.wknd-trendsetters.site/case-studies
- https://www.wknd-trendsetters.site/fashion-insights

### `blog-article` — 7 pages
Blog/article detail page: hero header with title and meta, followed by article
body content sections.

- **Representative:** https://www.wknd-trendsetters.site/blog/ace-pro-court-polo
- https://www.wknd-trendsetters.site/blog/fashion-blog-post
- https://www.wknd-trendsetters.site/blog/fashion-trends-young-culture
- https://www.wknd-trendsetters.site/blog/fashion-trends-young-style
- https://www.wknd-trendsetters.site/blog/flip-flop-summer-style
- https://www.wknd-trendsetters.site/blog/latest-trends-young-casual-fashion
- https://www.wknd-trendsetters.site/blog/street-style-trends

### `faq-page` — 1 page
FAQ page: hero header, expandable accordion of question/answer pairs, and a
supporting card grid section.

- **Representative:** https://www.wknd-trendsetters.site/faq

### `cards-showcase` — 1 page
Showcase page: hero header followed by a large multi-column image/card grid and
closing content sections.

- **Representative:** https://www.wknd-trendsetters.site/fashion-trends-young-adults-casual-sport

---

## 2. Block Variants

Every block variant detected across the site, grouped by base block. "EDS-mapped"
variants match a known Edge Delivery block; "custom/unknown" variants are content
blocks the analyzer could not map to a standard block and will need a custom
parser/variant during migration.

### hero (5 variants)

| Variant | Content shape | Pages | Where |
|---------|---------------|-------|-------|
| `hero-minimal-dark-withimg` | heading + image | 7 | all 7 `blog-article` pages |
| `hero-minimal-light-withimg` | heading + text + 2 CTAs + image | 3 | /blog, /faq, /fashion-insights |
| `hero-minimal-light-withimg-1` | heading + text + 2 CTAs + 3 images | 2 | /fashion-trends-of-the-season, /fashion-trends-young-adults |
| `hero-minimal-light` | heading + text + 1 CTA | 1 | /case-studies |
| `hero-minimal-light-withimg-2` | heading + text + 1 CTA + 2 images | 1 | /fashion-trends-young-adults-casual-sport |

### cards (2 variants)

| Variant | Content shape | Pages | Where |
|---------|---------------|-------|-------|
| `cards-minimal-dark` | heading + text | 1 | /faq |
| `cards-minimal-dark-withimg` | heading + text + image | 1 | /fashion-trends-young-adults-casual-sport |

### accordion (1 variant)

| Variant | Content shape | Pages | Where |
|---------|---------------|-------|-------|
| `accordion-moderate-dark` | expandable Q&A text | 1 | /faq |

### tabs (1 variant)

| Variant | Content shape | Pages | Where |
|---------|---------------|-------|-------|
| `tabs-minimal-dark-withimg` | text + 4 CTAs + 8 images | 1 | /case-studies |

### custom / unknown (11 variants)

These content sections did not map to a standard EDS block. Most are
column/feature-style sections (heading + text + image group) that would migrate
to `columns` or `cards` variants.

| Variant | Content shape | Pages | Where |
|---------|---------------|-------|-------|
| heading + text + 1 CTA (light) | heading + text + 1 CTA | 6 | /blog, /faq, /fashion-insights, /fashion-trends-of-the-season, /fashion-trends-young-adults, /fashion-trends-young-adults-casual-sport |
| heading + text + 1 CTA + image (dark) | heading + text + 1 CTA + image | 5 | /, /blog, /case-studies, /fashion-insights, /fashion-trends-of-the-season |
| heading + text + 6 images (dark) | heading + text + 6 images | 3 | /blog, /fashion-insights, /fashion-trends-of-the-season |
| image only (dark) | single image | 2 | /blog/ace-pro-court-polo, /blog/flip-flop-summer-style |
| heading + text + 4 images (light) | heading + text + 4 images | 2 | /fashion-insights, /fashion-trends-young-adults |
| heading + text + 1 CTA + image (light) | heading + text + 1 CTA + image | 1 | /fashion-trends-young-adults-casual-sport |
| heading + image (dark) | heading + image | 1 | /case-studies |
| heading + text + 8 images (dark) | heading + text + 8 images | 1 | /case-studies |
| heading + text + 3 images (dark) | heading + text + 3 images | 1 | /fashion-trends-young-adults |
| heading + text + 3 images (light) | heading + text + 3 images | 1 | /fashion-trends-of-the-season |
| heading + 4 images (dark) | heading + 4 images | 1 | /fashion-trends-young-adults |

### Site-wide (auto-populated)

| Variant | Notes |
|---------|-------|
| `header-global` | Shared site navigation (all pages) |
| `footer-global` | Shared site footer (all pages) |

---

## 3. Pages

All 15 published pages with template classification and detected blocks
(excluding the site-wide header/footer). "unknown" = a content section not
mapped to a standard EDS block.

| # | Page | Template | Blocks detected |
|---|------|----------|-----------------|
| 1 | / | content-landing | 1 custom section |
| 2 | /fashion-trends-of-the-season | content-landing | hero + 4 custom sections |
| 3 | /fashion-trends-young-adults | content-landing | hero + 4 custom sections |
| 4 | /blog | listing-index | hero + 3 custom sections |
| 5 | /case-studies | listing-index | hero + tabs + 3 custom sections |
| 6 | /fashion-insights | listing-index | hero + 4 custom sections |
| 7 | /blog/ace-pro-court-polo | blog-article | hero + 2 custom sections |
| 8 | /blog/fashion-blog-post | blog-article | hero |
| 9 | /blog/fashion-trends-young-culture | blog-article | hero |
| 10 | /blog/fashion-trends-young-style | blog-article | hero |
| 11 | /blog/flip-flop-summer-style | blog-article | hero + 2 custom sections |
| 12 | /blog/latest-trends-young-casual-fashion | blog-article | hero |
| 13 | /blog/street-style-trends | blog-article | hero |
| 14 | /faq | faq-page | hero + accordion + cards + 1 custom section |
| 15 | /fashion-trends-young-adults-casual-sport | cards-showcase | hero + 8 cards + 2 custom sections |

---

## Notes & recommendations

- **Sitemap absent.** URLs were discovered by crawl (85% confidence). If the site
  later publishes `/sitemap.xml`, re-run discovery to confirm no pages were missed.
- **`www` host.** This scope used `https://www.wknd-trendsetters.site`. The
  earlier About Us migration used the apex host (`wknd-trendsetters.site`); the
  `/about-us` page did not surface in this crawl and is not part of this catalog.
- **Custom sections dominate.** 11 of 22 variants are unmapped "column/feature"
  sections (heading + text + image groups). During migration these will most
  likely become `columns` and `cards` variants — the same pattern already built
  for the About Us page (`columns-intro`, `columns-article`, `cards-gallery`).
- **Recommended migration order:** start with a single representative page per
  template (single-page import), verify the blocks, then bulk-import the rest of
  each template. `blog-article` (7 pages) offers the most reuse leverage.

---

*Artifacts: `catalog/template-catalog.json`, `catalog/block-catalog.json`,
`catalog/summary.json`, `tools/importer/page-templates.json`,
`migration-work/visual-trees.json`.*
