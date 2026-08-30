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

  // tools/importer/import-content-landing.js
  var import_content_landing_exports = {};
  __export(import_content_landing_exports, {
    default: () => import_content_landing_default
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

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document: document2 }) {
    const children = Array.from(element.children).filter((c) => c.nodeType === 1);
    const imageCol = children.find((c) => c.querySelector("img"));
    const textCol = children.find((c) => c !== imageCol);
    const imageCell = [];
    if (imageCol) {
      Array.from(imageCol.querySelectorAll("img")).forEach((img) => imageCell.push(img));
    }
    const textCell = [];
    if (textCol) {
      Array.from(textCol.children).forEach((node) => textCell.push(node));
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
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document: document2 }) {
    const children = Array.from(element.children).filter((c) => c.nodeType === 1);
    const cells = [];
    children.forEach((card) => {
      const img = card.querySelector("img");
      if (img) cells.push([img]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document: document2 }) {
    const panels = Array.from(element.querySelectorAll(".tabs-content > .tab-pane, .tab-pane"));
    const buttons = Array.from(element.querySelectorAll(".tab-menu > .tab-menu-link, .tab-menu-link"));
    const cells = [];
    panels.forEach((panel, i) => {
      const button = buttons[i];
      const labelCell = [];
      if (button) {
        const inner = button.firstElementChild || button;
        Array.from(inner.children).forEach((node) => labelCell.push(node));
        if (!labelCell.length) labelCell.push(document2.createTextNode(button.textContent.trim()));
      } else {
        labelCell.push(document2.createTextNode(`Tab ${i + 1}`));
      }
      const contentCell = [];
      Array.from(panel.children).forEach((node) => contentCell.push(node));
      cells.push([labelCell, contentCell.length ? contentCell : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(element.children).filter((c) => c.nodeType === 1);
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      const bodyCell = [];
      const body = card.querySelector(".article-card-body") || card;
      const href = card.getAttribute("href") || card.querySelector("a") && card.querySelector("a").getAttribute("href");
      Array.from(body.children).forEach((node) => {
        const heading = node.matches('h1, h2, h3, h4, [class*="heading"]') ? node : node.querySelector('h1, h2, h3, h4, [class*="heading"]');
        if (href && heading && !heading.querySelector("a")) {
          const link = document2.createElement("a");
          link.setAttribute("href", href);
          link.textContent = heading.textContent.trim();
          heading.textContent = "";
          heading.append(link);
        }
        bodyCell.push(node);
      });
      if (img || bodyCell.length) {
        cells.push([img || "", bodyCell.length ? bodyCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll(":scope > .faq-item, :scope > details, details"));
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector("summary, .faq-question");
      const answer = item.querySelector(".faq-answer");
      const questionCell = [];
      if (summary) {
        const inner = summary.querySelector("span");
        questionCell.push(inner || document2.createTextNode(summary.textContent.trim()));
      }
      const answerCell = [];
      if (answer) {
        Array.from(answer.children).forEach((node) => answerCell.push(node));
        if (!answerCell.length) answerCell.push(document2.createTextNode(answer.textContent.trim()));
      }
      if (questionCell.length || answerCell.length) {
        cells.push([questionCell.length ? questionCell : "", answerCell.length ? answerCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector(':scope > img, img.utility-overlay, img[class*="overlay"], img.cover-image');
    const body = element.querySelector(".card-body") || element;
    const heading = body.querySelector('h1, h2, h3, [class*="heading"]');
    const subheading = body.querySelector('p, .subheading, [class*="subheading"]');
    const ctas = Array.from(body.querySelectorAll("a.button, .button-group a, a"));
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    ctas.forEach((a) => contentCell.push(a));
    if (!contentCell.length && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    if (contentCell.length) cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
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

  // tools/importer/import-content-landing.js
  var parsers = {
    "columns-intro": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-overlay": parse7
  };
  var PAGE_TEMPLATE = {
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
  var import_content_landing_default = {
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
  return __toCommonJS(import_content_landing_exports);
})();
