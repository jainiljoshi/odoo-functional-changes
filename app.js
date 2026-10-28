'use strict';
const cards = [...document.querySelectorAll('.change-card')];
const buttons = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#search');
let currentGroup = 'All';
function filterChanges() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const match = (currentGroup === 'All' || card.dataset.group === currentGroup) && terms.every(term => card.dataset.search.includes(term));
    card.hidden = !match;
    if (match) count++;
  }
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'area' : 'areas'}`;
  document.querySelector('#empty').hidden = count !== 0;
  for (const button of buttons) {
    const active = button.dataset.filter === currentGroup;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}
for (const button of buttons) button.addEventListener('click', () => {
  currentGroup = button.dataset.filter;
  filterChanges();
});
search.addEventListener('input', filterChanges);
document.querySelector('#clear-filters').addEventListener('click', () => {
  currentGroup = 'All';
  search.value = '';
  filterChanges();
  search.focus();
});
for (const link of document.querySelectorAll('.index-link')) link.addEventListener('click', () => {
  currentGroup = 'All';
  search.value = '';
  filterChanges();
});
