// Portfolio Interactive Script - Sivamani K

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('sivamani-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('sivamani-portfolio-theme', newTheme);
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Email Copy Functionality
  window.copyEmail = function () {
    const email = document.getElementById('email-text').innerText.trim();
    const btn = document.getElementById('copy-btn');
    
    navigator.clipboard.writeText(email).then(() => {
      const originalText = btn.innerText;
      btn.innerText = 'Copied! ✓';
      btn.style.backgroundColor = 'var(--success)';
      btn.style.color = '#ffffff';

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 2500);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  };

  // 4. Subtle Terminal Interactive Typing Effect
  const terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    terminalBody.addEventListener('click', () => {
      const newLine = document.createElement('div');
      newLine.className = 't-line t-dim';
      newLine.innerHTML = `[${new Date().toLocaleTimeString()}] Live Node ping: status 200 OK | Latency: 18ms`;
      terminalBody.insertBefore(newLine, terminalBody.lastElementChild);
    });
  }
});
