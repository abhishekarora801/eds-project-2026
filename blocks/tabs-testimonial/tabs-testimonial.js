// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  const rows = [...block.children];

  // Container that holds the active testimonial panel (image + text)
  const panelHolder = document.createElement('div');
  panelHolder.className = 'tabs-testimonial-panels';

  // Tab menu (row of avatar buttons) shown below the panel
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonial-list';
  tablist.setAttribute('role', 'tablist');

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const menuCell = cells[0]; // avatar + name + role (tab button source)
    const contentCell = cells[1] || cells[0]; // large image + name + role + quote

    const nameText = (menuCell.querySelector('strong')?.textContent || `tab-${i}`).trim();
    const id = toClassName(nameText) || `tab-${i}`;
    // capture role text before the picture is moved out of the menu cell
    const roleText = ([...menuCell.querySelectorAll('p')]
      .find((p) => !p.querySelector('picture') && !p.querySelector('strong'))
      ?.textContent || '').trim();

    // ---- Panel (image column + text column) ----
    const panel = document.createElement('div');
    panel.className = 'tabs-testimonial-panel';
    panel.id = `tabpanel-${id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    panel.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

    const imgCol = document.createElement('div');
    imgCol.className = 'tabs-testimonial-image';
    const picture = contentCell.querySelector('picture');
    if (picture) imgCol.append(picture);

    const textCol = document.createElement('div');
    textCol.className = 'tabs-testimonial-content';
    [...contentCell.querySelectorAll('p')].forEach((p) => {
      if (p.querySelector('picture')) return; // skip image paragraph
      if (p.querySelector('strong')) {
        p.className = 'tabs-testimonial-name';
      } else if (!textCol.querySelector('.tabs-testimonial-quote')
        && !p.previousElementSibling) {
        p.className = 'tabs-testimonial-role';
      } else if (p.previousElementSibling
        && p.previousElementSibling.querySelector('strong')) {
        p.className = 'tabs-testimonial-role';
      } else {
        p.className = 'tabs-testimonial-quote';
      }
      textCol.append(p);
    });

    panel.append(imgCol, textCol);
    panelHolder.append(panel);

    // ---- Tab button (avatar + name + role) ----
    const button = document.createElement('button');
    button.className = 'tabs-testimonial-tab';
    button.id = `tab-${id}`;
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

    const avatar = document.createElement('span');
    avatar.className = 'tabs-testimonial-avatar';
    const avatarPic = menuCell.querySelector('picture');
    if (avatarPic) avatar.append(avatarPic);

    const meta = document.createElement('span');
    meta.className = 'tabs-testimonial-tabmeta';
    meta.innerHTML = `<span class="tabs-testimonial-tabname">${nameText}</span>`
      + `<span class="tabs-testimonial-tabrole">${roleText}</span>`;

    button.append(avatar, meta);

    button.addEventListener('click', () => {
      panelHolder.querySelectorAll('[role=tabpanel]').forEach((p) => p.setAttribute('aria-hidden', 'true'));
      tablist.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', 'false'));
      panel.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-selected', 'true');
    });

    tablist.append(button);
  });

  rows.forEach((row) => row.remove());
  block.append(panelHolder, tablist);
}
