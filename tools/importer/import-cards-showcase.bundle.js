/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-cards-showcase.js
  var import_cards_showcase_exports = {};
  __export(import_cards_showcase_exports, {
    default: () => import_cards_showcase_default
  });

  // tools/importer/parsers/columns-intro.js
  function parse(element, { document: document2 }) {
    const children = Array.from(element.children).filter((c) => c.nodeType === 1);
    let imageCol = children.find((c) => c.querySelector("img"));
    let textCol = children.find((c) => c !== imageCol);
    const leftCell = [];
    const rightCell = [];
    if (textCol) {
      const heading = textCol.querySelector('h1, h2, h3, [class*="heading"]');
      const desc = textCol.querySelector('p, .subheading, [class*="subheading"]');
      const ctas = Array.from(textCol.querySelectorAll("a.button, .button-group a, a"));
      if (heading) leftCell.push(heading);
      if (desc) leftCell.push(desc);
      ctas.forEach((a) => leftCell.push(a));
    }
    if (imageCol) {
      const imgs = Array.from(imageCol.querySelectorAll("img"));
      imgs.forEach((img) => rightCell.push(img));
    }
    const cells = [];
    if (textCol && imageCol && children.indexOf(imageCol) < children.indexOf(textCol)) {
      cells.push([rightCell.length ? rightCell : "", leftCell.length ? leftCell : ""]);
    } else {
      cells.push([leftCell.length ? leftCell : "", rightCell.length ? rightCell : ""]);
    }
    if (!leftCell.length && !rightCell.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-intro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-trend.js
  function parse2(element, { document: document2 }) {
    const cards = Array.from(element.children).filter((c) => c.nodeType === 1);
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      const href = card.getAttribute("href") || card.querySelector("a") && card.querySelector("a").getAttribute("href");
      const body = card.querySelector(".trend-card-body") || card;
      const bodyCell = [];
      let title = "";
      Array.from(body.children).forEach((node) => {
        const heading = node.matches('h1, h2, h3, h4, h5, h6, [class*="heading"]') ? node : node.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
        if (heading && !title) title = heading.textContent.trim();
        bodyCell.push(node);
      });
      if (href) {
        const cta = document2.createElement("p");
        const link = document2.createElement("a");
        link.setAttribute("href", href);
        link.textContent = title || "Read more";
        cta.append(link);
        bodyCell.push(cta);
      }
      if (img || bodyCell.length) {
        cells.push([img || "", bodyCell.length ? bodyCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-trend", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse3(element, { document: document2 }) {
    const children = Array.from(element.children).filter((c) => c.nodeType === 1);
    const imageCol = children.find((c) => c.querySelector("img"));
    const textCol = children.find((c) => c !== imageCol);
    const imageCell = [];
    if (imageCol) {
      Array.from(imageCol.querySelectorAll("img")).forEach((img) => imageCell.push(img));
    }
    const textCell = [];
    if (textCol) {
      const heading = textCol.querySelector('h1, h2, h3, [class*="heading"]');
      const desc = textCol.querySelector('p, .paragraph-lg, [class*="paragraph"]');
      const ctas = Array.from(textCol.querySelectorAll("a.button, .button-group a, a"));
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      ctas.forEach((a) => textCell.push(a));
    }
    if (!imageCell.length && !textCell.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (imageCol && textCol && children.indexOf(textCol) < children.indexOf(imageCol)) {
      cells.push([textCell.length ? textCell : "", imageCell.length ? imageCell : ""]);
    } else {
      cells.push([imageCell.length ? imageCell : "", textCell.length ? textCell : ""]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "a.skip-link",
        "div.navbar",
        "footer.footer"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { Style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-cards-showcase.js
  var parsers = {
    "columns-intro": parse,
    "cards-trend": parse2,
    "columns-feature": parse3
  };
  var PAGE_TEMPLATE = {
    "name": "cards-showcase",
    "description": "Showcase page: hero intro, trend card grid, feature promo, accent CTA",
    "urls": [
      "https://www.wknd-trendsetters.site/fashion-trends-young-adults-casual-sport"
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
          "#trends .grid-layout.grid-gap-md"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "#main-content > section.section.secondary-section .grid-layout.grid-gap-lg"
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
        "name": "Trend grid",
        "selector": "#trends",
        "style": null,
        "blocks": [
          "cards-trend"
        ],
        "defaultContent": [
          "#trends > div.container > div.utility-text-align-center"
        ]
      },
      {
        "id": "rc3",
        "name": "Feature promo",
        "selector": "#main-content > section.section.secondary-section",
        "style": "secondary",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "rc4",
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
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    const transformers = [
      transform,
      ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
    ];
    transformers.forEach((fn) => {
      try {
        fn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_cards_showcase_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_cards_showcase_exports);
})();
