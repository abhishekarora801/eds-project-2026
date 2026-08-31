/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsIntroParser from './parsers/columns-intro.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsTrendParser from './parsers/cards-trend.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-intro': columnsIntroParser,
  'columns-feature': columnsFeatureParser,
  'cards-trend': cardsTrendParser,
  'cards-gallery': cardsGalleryParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
    "name": "trends-feature",
    "description": "Trends landing: hero intro, feature promo, 3-card trend grid, image gallery, accent CTA",
    "urls": [
      "https://www.wknd-trendsetters.site/fashion-trends-of-the-season"
    ],
    "blocks": [
      {
        "name": "columns-intro",
        "instances": [
          "#main-content > header.section.secondary-section .grid-layout.grid-gap-xxl"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "#trends > div.container > div.grid-layout.grid-gap-lg"
        ]
      },
      {
        "name": "cards-trend",
        "instances": [
          "#main-content > section.section.secondary-section > div.container > div.grid-layout.desktop-3-column"
        ]
      },
      {
        "name": "cards-gallery",
        "instances": [
          "#main-content > section.section:nth-of-type(3) > div.container > div.grid-layout.grid-gap-sm"
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
        "name": "Feature promo",
        "selector": "#trends",
        "style": null,
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": [
          "#trends > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc3",
        "name": "Trend cards",
        "selector": "#main-content > section.section.secondary-section",
        "style": "secondary",
        "blocks": [
          "cards-trend"
        ],
        "defaultContent": [
          "#main-content > section.section.secondary-section > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc4",
        "name": "Gallery",
        "selector": "#main-content > section.section:nth-of-type(3)",
        "style": null,
        "blocks": [
          "cards-gallery"
        ],
        "defaultContent": [
          "#main-content > section.section:nth-of-type(3) > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc5",
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
