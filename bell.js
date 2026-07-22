// Bell icon: requests notification permission, registers a service worker,
// and toggles notifications on/off once permission is granted.

const bellBtn = document.getElementById('bell-btn');

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    return await navigator.serviceWorker.register('./sw.js');
  } catch (err) {
    console.error('Service worker registration failed:', err);
    return null;
  }
}

function isBellEnabled() {
  return localStorage.getItem('bellEnabled') !== '0';
}

function setBellVisual(enabled) {
  bellBtn.classList.toggle('bell-off', !enabled);
}

function setBellEnabled(enabled) {
  localStorage.setItem('bellEnabled', enabled ? '1' : '0');
  setBellVisual(enabled);
}

function showBellError() {
  bellBtn.classList.add('bell-error');
  setTimeout(() => {
    bellBtn.classList.remove('bell-error');
  }, 5000);
}

async function handleBellClick() {
  if (!('Notification' in window)) {
    showBellError();
    return;
  }

  // Already decided and granted before — this click just toggles on/off
  if (Notification.permission === 'granted') {
    setBellEnabled(!isBellEnabled());
    return;
  }

  // Browser already blocked notifications for this site previously — requestPermission()
  // will just silently resolve to "denied" again without prompting, so treat it as an error state.
  if (Notification.permission === 'denied') {
    showBellError();
    return;
  }

  // First time asking — show the real browser permission prompt
  try {
    const result = await Notification.requestPermission();
    if (result === 'granted') {
      await registerServiceWorker();
      setBellEnabled(true);
      new Notification('Сповіщення увімкнено', {
        body: 'Ви будете отримувати сповіщення від цього сайту.',
      });
    } else {
      showBellError();
    }
  } catch (err) {
    console.error('Notification permission request failed:', err);
    showBellError();
  }
}

bellBtn.addEventListener('click', handleBellClick);

// Restore the correct icon state on page load
if ('Notification' in window && Notification.permission === 'granted') {
  setBellVisual(isBellEnabled());
  registerServiceWorker();
}
