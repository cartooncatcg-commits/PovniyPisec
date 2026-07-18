// Handles the 5 nav buttons and shows the right message below them.
// "головна" (home) stays empty — it's the default landing page.

const navButtons = document.querySelectorAll('.nav-btn');
const pageContent = document.getElementById('page-content');

// Give each bookmark a random shade of blue/teal/cyan every time the page loads
navButtons.forEach(btn => {
  const hue = Math.floor(Math.random() * (215 - 175 + 1)) + 175; // 175–215: teal through blue
  const saturation = Math.floor(Math.random() * (75 - 55 + 1)) + 55; // 55–75%
  const lightness = Math.floor(Math.random() * (52 - 40 + 1)) + 40;  // 40–52%
  btn.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});

// Give each bookmark a random length by varying its side padding.
// The text itself always sizes the button first (flex: 0 0 auto), so this only ever
// ADDS extra breathing room — it can never shrink a bookmark enough to clip its own text,
// and the upper bound keeps any bookmark from getting comically long.
navButtons.forEach(btn => {
  const isMobile = window.innerWidth <= 768;
  const [min, max] = isMobile ? [10, 20] : [22, 42]; // narrower range on mobile so all 5 fit on screen
  const sidePadding = Math.floor(Math.random() * (max - min + 1)) + min;
  btn.style.paddingLeft = `${sidePadding}px`;
  btn.style.paddingRight = `${sidePadding}px`;
});

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
