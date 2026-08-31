/*
 * spec block
 * Renders imported label/value rows as a compact 2-column specification table.
 * Source (wknd-trendsetters blog article) is a native <table> with a
 * "Spec / Detail" header row; the importer captured it as a block whose first
 * cell ("Spec") became the block name. Each block row is [label | value].
 */
export default function decorate(block) {
  const rows = [...block.children];

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row: "Spec" / "Detail"
  const headTr = document.createElement('tr');
  ['Spec', 'Detail'].forEach((label) => {
    const th = document.createElement('th');
    th.textContent = label;
    headTr.append(th);
  });
  thead.append(headTr);

  rows.forEach((row) => {
    const cells = [...row.children];
    const tr = document.createElement('tr');
    // label cell (strong), value cell
    const labelTd = document.createElement('td');
    labelTd.className = 'spec-label';
    labelTd.innerHTML = (cells[0] && cells[0].innerHTML) || '';
    const valueTd = document.createElement('td');
    valueTd.className = 'spec-value';
    valueTd.innerHTML = (cells[1] && cells[1].innerHTML) || '';
    tr.append(labelTd, valueTd);
    tbody.append(tr);
  });

  table.append(thead, tbody);
  block.textContent = '';
  block.append(table);
}
