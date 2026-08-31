export default function decorate(block) {
  const isVertical = block.classList.contains('vertical');
  const [right, left] = block.querySelectorAll(':scope > div');
  right.className = 'image-compare-right';
  left.className = 'image-compare-left';

  const slider = document.createElement('div');
  slider.className = 'image-compare-slider';

  const range = document.createElement('input');
  range.type = 'range';
  range.min = 0;
  range.max = 100;
  range.value = 50;
  range.setAttribute('aria-label', 'Compare images');
  if (isVertical) range.setAttribute('orient', 'vertical');

  range.addEventListener('input', (e) => {
    if (isVertical) {
      left.style.height = `${e.target.value}%`;
    } else {
      left.style.width = `${e.target.value}%`;
    }
  });

  slider.append(range);
  left.after(slider);
}
