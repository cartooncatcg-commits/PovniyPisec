// Cyan snowflakes falling from the top of the screen, on a loop.
// Snow only appears during fall and winter (Sep–Feb). It's hidden during spring/summer (Mar–Aug).

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

function isSnowSeason() {
  // Preview trick: open the site with ?forceSnow=1 at the end of the URL
  // to see the snow effect even outside fall/winter. Remove this block later if you want.
  if (new URLSearchParams(window.location.search).get('forceSnow') === '1') {
    return true;
  }

  // Use Kyiv time specifically, regardless of the visitor's own timezone
  const kyivMonthStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    month: 'numeric'
  }).format(new Date());
  const month = parseInt(kyivMonthStr, 10) - 1; // convert to 0 = January ... 11 = December
  // Fall: Sep(8), Oct(9), Nov(10) — Winter: Dec(11), Jan(0), Feb(1)
  return month === 8 || month === 9 || month === 10 || month === 11 || month === 0 || month === 1;
}

if (!isSnowSeason()) {
  // Spring/Summer: hide the canvas entirely and skip all the animation work
  canvas.style.display = 'none';
} else {

let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// How many snowflakes to keep on screen at once. Turn this up/down for more/less snow.
const FLAKE_COUNT = 80;

function randomFlake() {
  return {
    x: Math.random() * width,
    y: Math.random() * -height,       // start above the screen so they drift in
    radius: Math.random() * 2.2 + 1.2,  // size
    speed: Math.random() * 1 + 0.5,   // fall speed
    drift: Math.random() * 1 - 0.5,   // slight left/right sway
    swayOffset: Math.random() * Math.PI * 2
  };
}

const flakes = Array.from({ length: FLAKE_COUNT }, randomFlake);
flakes.forEach(f => (f.rotation = Math.random() * Math.PI * 2));
flakes.forEach(f => (f.rotSpeed = (Math.random() - 0.5) * 0.02));

// Draws a classic 6-armed snowflake crystal, scaled by `size`
function drawSnowflake(x, y, size, rotation) {
  const armLength = size * 3.5; // overall arm length
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.strokeStyle = '#00e5ff';
  ctx.shadowColor = '#00e5ff';
  ctx.shadowBlur = 3;
  ctx.lineWidth = Math.max(size * 0.45, 1.3);
  ctx.lineCap = 'round';

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 3) * i);

    // main arm
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, armLength);
    ctx.stroke();

    // two small side branches near the tip
    const branchY = armLength * 0.55;
    const branchLen = armLength * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, branchY);
    ctx.lineTo(branchLen * 0.7, branchY + branchLen * 0.7);
    ctx.moveTo(0, branchY);
    ctx.lineTo(-branchLen * 0.7, branchY + branchLen * 0.7);
    ctx.stroke();

    const branchY2 = armLength * 0.8;
    const branchLen2 = armLength * 0.25;
    ctx.beginPath();
    ctx.moveTo(0, branchY2);
    ctx.lineTo(branchLen2 * 0.7, branchY2 + branchLen2 * 0.7);
    ctx.moveTo(0, branchY2);
    ctx.lineTo(-branchLen2 * 0.7, branchY2 + branchLen2 * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = 0.85;

  for (const flake of flakes) {
    drawSnowflake(flake.x, flake.y, flake.radius, flake.rotation);
  }
  ctx.globalAlpha = 1;
}

function update() {
  for (const flake of flakes) {
    flake.y += flake.speed;
    flake.x += Math.sin(flake.y * 0.01 + flake.swayOffset) * flake.drift * 0.3;
    flake.rotation += flake.rotSpeed;

    // reset once it falls off the bottom
    if (flake.y > height) {
      flake.y = Math.random() * -50;
      flake.x = Math.random() * width;
    }
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

} // end isSnowSeason() else block
