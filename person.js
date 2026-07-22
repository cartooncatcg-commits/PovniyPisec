// Person icon: opens a password prompt. Correct password enables "developer mode",
// which can later be checked elsewhere (localStorage.getItem('devMode') === '1')
// to unlock features that require it. Clicking the icon again while active turns it off.

const personBtn = document.getElementById('person-btn');
const passwordModal = document.getElementById('password-modal');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordCancel = document.getElementById('password-cancel');

const DEV_PASSWORD = 'A1B2C345123456789';

function isDevMode() {
  return localStorage.getItem('devMode') === '1';
}

function setDevMode(on) {
  localStorage.setItem('devMode', on ? '1' : '0');
  personBtn.classList.toggle('dev-active', on);
}

function openModal() {
  passwordModal.classList.add('open');
  passwordInput.value = '';
  passwordInput.classList.remove('shake');
  setTimeout(() => passwordInput.focus(), 50);
}

function closeModal() {
  passwordModal.classList.remove('open');
}

function trySubmitPassword() {
  if (passwordInput.value === DEV_PASSWORD) {
    setDevMode(true);
    closeModal();
  } else {
    passwordInput.classList.remove('shake');
    // restart the shake animation even if clicked repeatedly
    void passwordInput.offsetWidth;
    passwordInput.classList.add('shake');
  }
}

personBtn.addEventListener('click', () => {
  if (isDevMode()) {
    setDevMode(false);
    return;
  }
  openModal();
});

passwordSubmit.addEventListener('click', trySubmitPassword);
passwordCancel.addEventListener('click', closeModal);

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') trySubmitPassword();
  if (e.key === 'Escape') closeModal();
});

passwordModal.addEventListener('click', (e) => {
  if (e.target === passwordModal) closeModal(); // click outside the box closes it
});

// Restore visual state on load
if (isDevMode()) {
  personBtn.classList.add('dev-active');
}
