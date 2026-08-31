/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsIntroParser from './parsers/columns-intro.js';
import cardsTrendParser from './parsers/cards-trend.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-intro': columnsIntroParser,
  'cards-trend': cardsTrendParser,
  'cards-article': cardsArticleParser,
  'cards-gallery': cardsGalleryParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
    "name": "trends-listing",
    "description": "Trends listing: hero intro, 3-card trend grid, article-card grid, image gallery, accent CTA",
    "urls": [
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
        "name": "cards-trend",
        "instances": [
          "#main-content > section.section:nth-of-type(1) .grid-layout.desktop-3-column"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          "#trends .grid-layout.desktop-4-column"
        ]
      },
      {
        "name": "cards-gallery",
        "instances": [
          "#main-content > section.section:nth-of-type(4) .grid-layout.desktop-4-column"
        ]
      }
    ],
    "sections": [
      {
        "id": "rc1",
        "name": "Hero intro",
        "selector": "#main-content > header.section.secondary-section",
        "style": "secondary",
        "blocks": [
          "columns-intro"
        ],
        "defaultContent": []
      },
      {
        "id": "rc2",
        "name": "Trend cards",
        "selector": "#main-content > section.section:nth-of-type(1)",
        "style": null,
        "blocks": [
          "cards-trend"
        ],
        "defaultContent": []
      },
      {
        "id": "rc3",
        "name": "Section heading",
        "selector": "#main-content > section.section:nth-of-type(2)",
        "style": "secondary",
        "blocks": [],
        "defaultContent": [
          "#main-content > section.section:nth-of-type(2) > div.container"
        ]
      },
      {
        "id": "rc4",
        "name": "Article cards",
        "selector": "#trends",
        "style": "secondary",
        "blocks": [
          "cards-article"
        ],
        "defaultContent": [
          "#trends > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc5",
        "name": "Gallery",
        "selector": "#main-content > section.section:nth-of-type(4)",
        "style": null,
        "blocks": [
          "cards-gallery"
        ],
        "defaultContent": [
          "#main-content > section.section:nth-of-type(4) > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc6",
        "name": "Accent CTA",
        "selector": "#main-content > section.section.accent-section",
        "style": "accent",
        "blocks": [],
        "defaultContent": [
          "#main-content > section.section.accent-section > div.container"
        ]
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
    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
  }
};
