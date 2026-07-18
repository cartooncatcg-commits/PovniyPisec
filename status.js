// Shows "відчинено" (open) / "зачинено" (closed) based on Kyiv time.
// Weekdays (Mon–Fri): open 08:00–18:00
// Weekends (Sat–Sun): open 08:00–17:00

const statusEl = document.getElementById('status-text');

function getKyivParts() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const map = {};
  for (const p of parts) map[p.type] = p.value;

  // "24" from some browsers means midnight — normalize to 0
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);
  const weekday = map.weekday; // "Mon", "Tue", ... "Sun"

  return { hour, minute, weekday };
}

function isOpenNow() {
  const { hour, minute, weekday } = getKyivParts();
  const totalMinutes = hour * 60 + minute;

  const openTime = 8 * 60; // 08:00
  const isWeekend = weekday === 'Sat' || weekday === 'Sun';
  const closeTime = isWeekend ? 17 * 60 : 18 * 60; // weekends close at 17:00, weekdays at 18:00

  return totalMinutes >= openTime && totalMinutes < closeTime;
}

function updateStatus() {
  const open = isOpenNow();
  statusEl.textContent = open ? 'відчинено' : 'зачинено';
  statusEl.classList.toggle('open', open);
  statusEl.classList.toggle('closed', !open);
}

updateStatus();
setInterval(updateStatus, 30000); // re-check every 30 seconds so it flips live at 8:00/17:00/18:00
