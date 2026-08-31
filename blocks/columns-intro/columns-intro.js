export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-intro-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-intro-img-col');
        }
      }
    });
  });

  // decorate CTA links (source: primary "See case" + secondary "All stories")
  cols.forEach((col) => {
    if (col.querySelector('picture')) return;
    const btnParagraphs = [...col.querySelectorAll(':scope > p')].filter((p) => {
      const a = p.querySelector('a');
      return a && p.textContent.trim() === a.textContent.trim();
    });
    if (!btnParagraphs.length) return;

    const group = document.createElement('div');
    group.className = 'columns-intro-buttons';
    btnParagraphs.forEach((p, i) => {
      const a = p.querySelector('a');
      a.classList.add('button', i === 0 ? 'primary' : 'secondary');
      group.append(a);
      p.remove();
    });
    col.append(group);
  });
}
