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

// Rare 1-in-250 chance: a bookmark becomes black with a red border instead of the usual random color.
// It still gets a normal random length + tail shape, just with different colors.
const shapes = ['shape-point', 'shape-flat', 'shape-notch', 'shape-taper'];
const RARE_CHANCE = 1 / 250;

navButtons.forEach(btn => {
  const isRare = Math.random() < RARE_CHANCE;

  if (isRare) {
    btn.style.backgroundColor = '#1a1a1a';
    btn.style.borderColor = '#e02424';
  }

  // Random LENGTH (how far it hangs down), limited so it's never too short or too long
  const extraLength = Math.floor(Math.random() * (26 - 6 + 1)) + 6; // 6–26px extra length
  btn.style.paddingBottom = `${extraLength}px`;

  // Random tail shape: pointed, flat, notched (swallow-tail), or tapered
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  btn.classList.add(shape);
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
