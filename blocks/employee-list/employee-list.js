const PAGE_SIZE = 10;

async function fetchPlaceholders() {
  if (!window.placeholders) {
    try {
      const res = await fetch('/placeholders.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      window.placeholders = Object.fromEntries(
        (json.data || []).map((row) => [row.Key, row.Text]),
      );
    } catch {
      window.placeholders = {};
    }
  }
  return window.placeholders;
}

function renderRows(employees, container) {
  employees.forEach((emp) => {
    const card = document.createElement('div');
    card.className = 'employee-list-item';
    card.innerHTML = `
      <div class="employee-list-name">${emp.Name || ''}</div>
      <div class="employee-list-meta">
        <span class="employee-list-department">${emp.Department || ''}</span>
        <span class="employee-list-experience">${emp.Experience || ''} yrs</span>
        <span class="employee-list-city">${emp.City || ''}</span>
      </div>
    `;
    container.append(card);
  });
}

export default async function decorate(block) {
  const source = block.querySelector('a')?.href || '/employees.json';
  block.textContent = '';

  const list = document.createElement('div');
  list.className = 'employee-list-items';
  block.append(list);

  let all = [];
  try {
    const res = await fetch(source);
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    all = json.data || [];
  } catch (err) {
    block.textContent = 'Unable to load employees.';
    return;
  }

  let shown = 0;
  const showNext = () => {
    const next = all.slice(shown, shown + PAGE_SIZE);
    renderRows(next, list);
    shown += next.length;
    // eslint-disable-next-line no-use-before-define
    if (shown >= all.length) button.remove();
  };

  const placeholders = await fetchPlaceholders();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'employee-list-load-more';
  button.textContent = placeholders.loadMore || 'Load more';
  button.addEventListener('click', showNext);

  showNext();
  if (shown < all.length) block.append(button);
}
