/* auth.js - password gate logic */

(function () {
  var PASSWORD = 'mccombsbestproductclass';

  function isAuthed() {
    return sessionStorage.getItem('auth') === 'granted' ||
           localStorage.getItem('auth') === 'granted';
  }

  var isAssignment = window.location.pathname.indexOf('/assignments/') !== -1;

  if (isAuthed()) {
    /* Already authenticated */
    if (!isAssignment) {
      document.addEventListener('DOMContentLoaded', showPortfolio);
    }
    return;
  }

  if (isAssignment) {
    /* Not authed on an assignment page - go back to gate */
    window.location.replace('../index.html');
    return;
  }

  /* Index page - show gate on load */
  document.addEventListener('DOMContentLoaded', function () {
    var gate   = document.getElementById('gate');
    var input  = document.getElementById('gate-password');
    var btn    = document.getElementById('gate-btn');
    var errMsg = document.getElementById('gate-error');

    if (gate) gate.style.display = 'flex';

    function attempt() {
      var val = input ? input.value.trim() : '';
      if (val === PASSWORD) {
        sessionStorage.setItem('auth', 'granted');
        localStorage.setItem('auth', 'granted');
        if (gate) gate.style.display = 'none';
        showPortfolio();
      } else {
        if (errMsg) errMsg.textContent = 'Incorrect password';
        if (input) {
          input.classList.remove('shake');
          void input.offsetWidth;
          input.classList.add('shake');
          setTimeout(function () { input.classList.remove('shake'); }, 500);
        }
      }
    }

    if (btn) btn.addEventListener('click', attempt);
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') attempt();
        if (errMsg && e.key !== 'Enter') errMsg.textContent = '';
      });
      input.focus();
    }
  });

  function showPortfolio() {
    var p = document.getElementById('portfolio');
    if (p) p.style.display = 'block';
  }
})();
