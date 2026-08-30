/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsIntroParser from './parsers/columns-intro.js';
import columnsArticleParser from './parsers/columns-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticleParser from './parsers/cards-article.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroOverlayParser from './parsers/hero-overlay.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-intro': columnsIntroParser,
  'columns-article': columnsArticleParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-article': cardsArticleParser,
  'accordion-faq': accordionFaqParser,
  'hero-overlay': heroOverlayParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
    "name": "content-landing",
    "description": "Marketing/landing page: hero intro + full-width content sections (text+image groups, galleries, testimonials, CTA)",
    "urls": [
      "https://www.wknd-trendsetters.site/",
      "https://www.wknd-trendsetters.site/fashion-trends-of-the-season",
      "https://www.wknd-trendsetters.site/fashion-trends-young-adults"
    ],
    "blocks": [
      {
        "name": "columns-intro",
        "instances": [
          "#main-content > header.section.secondary-section .grid-layout.grid-gap-xxl"
        ]
      },
      {
        "name": "columns-article",
        "instances": [
          "#main-content > section.section:nth-of-type(1) .grid-layout.grid-gap-lg"
        ]
      },
      {
        "name": "cards-gallery",
        "instances": [
          "#main-content > section.section.secondary-section:nth-of-type(2) .grid-layout.grid-gap-sm"
        ]
      },
      {
        "name": "tabs-testimonial",
        "instances": [
          "#main-content > section.section:nth-of-type(3) .tabs-wrapper"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          "#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.grid-gap-md"
        ]
      },
      {
        "name": "accordion-faq",
        "instances": [
          "#main-content > section.section:nth-of-type(5) .faq-list"
        ]
      },
      {
        "name": "hero-overlay",
        "instances": [
          "#main-content > section.section.inverse-section .grid-layout.desktop-1-column"
        ]
      }
    ],
    "sections": [
      {
        "id": "rc1",
        "name": "Intro",
        "selector": "#main-content > header.section.secondary-section",
        "style": "secondary",
        "blocks": [
          "columns-intro"
        ],
        "defaultContent": []
      },
      {
        "id": "rc2",
        "name": "Article header",
        "selector": "#main-content > section.section:nth-of-type(1)",
        "style": null,
        "blocks": [
          "columns-article"
        ],
        "defaultContent": []
      },
      {
        "id": "rc3",
        "name": "Snapshot gallery",
        "selector": "#main-content > section.section.secondary-section:nth-of-type(2)",
        "style": "secondary",
        "blocks": [
          "cards-gallery"
        ],
        "defaultContent": [
          "#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc4",
        "name": "Testimonials",
        "selector": "#main-content > section.section:nth-of-type(3)",
        "style": null,
        "blocks": [
          "tabs-testimonial"
        ],
        "defaultContent": []
      },
      {
        "id": "rc5",
        "name": "Latest articles",
        "selector": "#main-content > section.section.secondary-section:nth-of-type(4)",
        "style": "secondary",
        "blocks": [
          "cards-article"
        ],
        "defaultContent": [
          "#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc6",
        "name": "FAQ",
        "selector": "#main-content > section.section:nth-of-type(5)",
        "style": null,
        "blocks": [
          "accordion-faq"
        ],
        "defaultContent": [
          "#main-content > section.section:nth-of-type(5) .grid-layout.grid-gap-xxl > div:first-child"
        ]
      },
      {
        "id": "rc7",
        "name": "Closing CTA",
        "selector": "#main-content > section.section.inverse-section",
        "style": null,
        "blocks": [
          "hero-overlay"
        ],
        "defaultContent": []
      }
    ]
  };

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  const transformers = [
    cleanupTransformer,
    ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
  ];
  transformers.forEach((fn) => {
    try { fn.call(null, hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      elements.forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try { parser(block.element, { document, url, params }); }
        catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  }
};
