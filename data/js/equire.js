enquire.register('screen and (max-width: 768px)', {
  match: () => {
    const mainContent = document.getElementById('main');
    mainContent.classList.add('simplified-view');
  },
  unmatch: () => {
    const mainContent = document.getElementById('main');
    mainContent.classList.remove('simplified-view');
  },
});