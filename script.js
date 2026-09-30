// Portfolio Interactive Script - Sivamani K (Enhanced & Unique)

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Ambient Particle Mesh Canvas
  // ==========================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.6,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const pColor = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.25)';
      const lColor = isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(79, 70, 229, 0.08)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lColor;
            ctx.lineWidth = 1 - dist / 130;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================
  // 2. Theme Management (Dark / Light)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const savedTheme = localStorage.getItem('sivamani-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('sivamani-portfolio-theme', newTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ==========================================
  // 3. Mobile Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 4. Command Palette (Ctrl + K / ⌘K)
  // ==========================================
  const cmdOverlay = document.getElementById('cmd-overlay');
  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');

  function openCommandPalette() {
    if (cmdOverlay) {
      cmdOverlay.classList.add('active');
      if (cmdInput) {
        cmdInput.value = '';
        cmdInput.focus();
        filterCommands('');
      }
    }
  }

  function closeCommandPalette() {
    if (cmdOverlay) {
      cmdOverlay.classList.remove('active');
    }
  }

  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openCommandPalette);
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdOverlay && cmdOverlay.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape' && cmdOverlay && cmdOverlay.classList.contains('active')) {
      closeCommandPalette();
    }
  });

  if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCommandPalette();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterCommands(e.target.value.toLowerCase());
    });
  }

  function filterCommands(query) {
    if (!cmdResults) return;
    const items = cmdResults.querySelectorAll('.cmd-item');
    items.forEach((item) => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }

  window.executeCmd = function (action) {
    closeCommandPalette();
    switch (action) {
      case 'resume':
        window.open('resume/index.html', '_blank');
        break;
      case 'hvms':
        window.open('https://hostelvistor.onrender.com/login', '_blank');
        break;
      case 'bankvcs':
        window.open('https://banking-application-version-control-4.onrender.com/', '_blank');
        break;
      case 'labs':
        document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'copy-email':
        copyEmail();
        break;
      case 'github':
        window.open('https://github.com/SIVAMANI-arch', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/sivamani-k-454186397/', '_blank');
        break;
      case 'theme':
        toggleTheme();
        break;
    }
  };

  // ==========================================
  // 5. Native WebCrypto SHA-256 Hash Chain Simulator
  // ==========================================
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  let isTampered = false;

  window.updateHashChain = async function () {
    if (isTampered) return; // If manually tampered, don't auto-resolve

    const b1Input = document.querySelector('#block-1 .block-input')?.value || '';
    const b2Input = document.querySelector('#block-2 .block-input')?.value || '';
    const b3Input = document.querySelector('#block-3 .block-input')?.value || '';

    // Block 1
    const h1 = await sha256('0000000000000000' + b1Input);
    document.getElementById('hash-1').innerText = h1.substring(0, 16) + '...';

    // Block 2
    document.getElementById('prev-2').innerText = h1.substring(0, 16) + '...';
    const h2 = await sha256(h1 + b2Input);
    document.getElementById('hash-2').innerText = h2.substring(0, 16) + '...';

    // Block 3
    document.getElementById('prev-3').innerText = h2.substring(0, 16) + '...';
    const h3 = await sha256(h2 + b3Input);
    document.getElementById('hash-3').innerText = h3.substring(0, 16) + '...';
  };

  window.simulateTampering = async function () {
    isTampered = true;
    const b2 = document.getElementById('block-2');
    const b3 = document.getElementById('block-3');
    const banner = document.getElementById('chain-status-banner');
    const bannerText = document.getElementById('chain-status-text');

    // Tamper input without recomputing block 3
    const input2 = document.getElementById('block-2-input');
    input2.value = 'MALICIOUS_UPDATE: Balance wiped to ₹0 [ATTACK]';

    const h1 = (document.getElementById('hash-1').innerText || '').replace('...', '');
    const tamperedH2 = await sha256(h1 + input2.value);
    document.getElementById('hash-2').innerText = tamperedH2.substring(0, 16) + '...';

    // Flag visual tampering
    b2.classList.add('tampered');
    b3.classList.add('tampered');

    const status2 = b2.querySelector('.block-status');
    const status3 = b3.querySelector('.block-status');
    if (status2) {
      status2.className = 'block-status tampered';
      status2.innerText = 'ALTERED';
    }
    if (status3) {
      status3.className = 'block-status tampered';
      status3.innerText = 'BROKEN CHAIN';
    }

    if (banner) {
      banner.className = 'chain-banner tampered';
      bannerText.innerText = '⚠️ CRITICAL ALERT: SHA-256 Hash Mismatch! Block #2 altered, Block #3 continuity broken.';
    }
  };

  window.resetHashChain = function () {
    isTampered = false;
    const b2 = document.getElementById('block-2');
    const b3 = document.getElementById('block-3');
    const banner = document.getElementById('chain-status-banner');
    const bannerText = document.getElementById('chain-status-text');

    b2.classList.remove('tampered');
    b3.classList.remove('tampered');

    const input2 = document.getElementById('block-2-input');
    input2.value = 'TRANSFER: ₹25,000 to Beneficiary Suresh';

    const status2 = b2.querySelector('.block-status');
    const status3 = b3.querySelector('.block-status');
    if (status2) {
      status2.className = 'block-status valid';
      status2.innerText = 'VALID';
    }
    if (status3) {
      status3.className = 'block-status valid';
      status3.innerText = 'VALID';
    }

    if (banner) {
      banner.className = 'chain-banner';
      bannerText.innerText = 'Cryptographic Audit Chain Continuity: 100% Verified.';
    }

    updateHashChain();
  };

  // Initial calculation
  updateHashChain();

  // ==========================================
  // 6. HVMS Gate Pass Simulator
  // ==========================================
  window.generateSimPass = function () {
    const vName = document.getElementById('sim-visitor-name').value.trim() || 'Visitor';
    const hName = document.getElementById('sim-host-name').value.trim() || 'Student Host';

    document.getElementById('pass-visitor-display').innerText = vName;
    document.getElementById('pass-host-display').innerText = hName;

    // Generate random hex token
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    document.getElementById('pass-token-display').innerText = `PASS_TOKEN_${randomHex}`;

    const passCard = document.getElementById('digital-pass-card');
    passCard.style.transform = 'scale(1.02)';
    setTimeout(() => {
      passCard.style.transform = 'scale(1)';
    }, 200);
  };

  // ==========================================
  // 7. Email Copy Functionality
  // ==========================================
  window.copyEmail = function () {
    const email = document.getElementById('email-text').innerText.trim();
    const btn = document.getElementById('copy-btn');

    navigator.clipboard
      .writeText(email)
      .then(() => {
        if (btn) {
          const originalText = btn.innerText;
          btn.innerText = 'Copied! ✓';
          btn.style.backgroundColor = 'var(--success)';
          btn.style.color = '#ffffff';

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2500);
        } else {
          alert('Copied email: ' + email);
        }
      })
      .catch((err) => {
        console.error('Clipboard copy failed:', err);
      });
  };
});
