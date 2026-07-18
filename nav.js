// Handles the 5 nav buttons and shows the right message below them.
// "головна" (home) stays empty — it's the default landing page.

const navButtons = document.querySelectorAll('.nav-btn');
const pageContent = document.getElementById('page-content');

const messages = {
  home: '',                          // main page — no message shown
  discounts: 'Знижок поки що нема',
  promos: 'Акцій поки що нема',
  news: 'Новин поки що нема',
  product: 'Товару поки що нема'
};

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const key = btn.dataset.page;
    pageContent.textContent = messages[key] || '';
  });
});
