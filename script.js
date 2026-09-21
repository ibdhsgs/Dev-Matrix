/**
 * Dev Matrix — Brand Identity Presentation Interactive Script
 * Features:
 * - Geometric Background Canvas (Digital Network Grid)
 * - Navigation Scroll & Mobile Toggle
 * - Scroll Reveal Animations
 * - Anatomy Hotspots & Legend Interactivity
 * - Color Swatch Copy with Toast
 * - DM Pattern Canvas Rendering (Hero & Variants)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initHeroGridCanvas();
  initColorCopy();
  initAnatomyInteraction();
  initPatternCanvases();
});

/* ===================================================================
   1. NAVIGATION & SCROLL TRACKING
=================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Navbar glass background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active section tracking
  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ===================================================================
   2. SCROLL REVEAL (INTERSECTION OBSERVER)
=================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ===================================================================
   3. HERO CANVAS — DIGITAL NETWORK GRID
=================================================================== */
function initHeroGridCanvas() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouse = { x: width / 2, y: height / 2, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initPoints();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Create geometric nodes
  let points = [];
  const pointCount = Math.min(Math.floor((width * height) / 16000), 75);

  function initPoints() {
    points = [];
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        baseX: 0,
        baseY: 0
      });
    }
  }
  initPoints();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle isometric grid lines
    ctx.strokeStyle = 'rgba(21, 101, 192, 0.035)';
    ctx.lineWidth = 1;
    const gridSize = 60;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update and draw points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw point
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30, 136, 229, 0.4)';
      ctx.fill();

      // Connect near points
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity = (1 - dist / 130) * 0.18;
          ctx.strokeStyle = `rgba(21, 101, 192, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(41, 182, 246, ${(1 - mdist / mouse.radius) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* ===================================================================
   4. COLOR PALETTE COPY SYSTEM
=================================================================== */
function initColorCopy() {
  const cards = document.querySelectorAll('.color-card');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  cards.forEach(card => {
    const hex = card.getAttribute('data-hex');
    const btn = card.querySelector('.copy-btn');
    if (!hex) return;

    // Card click or button click
    card.addEventListener('click', () => {
      copyColorCode(hex);
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyColorCode(hex);
      });
    }
  });

  function copyColorCode(color) {
    navigator.clipboard.writeText(color).then(() => {
      showToast(`تم نسخ الكود: ${color}`);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = color;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(`تم نسخ الكود: ${color}`);
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
}

// Global copy function called from inline onclick fallback
window.copyColor = function(hex, btn) {
  navigator.clipboard.writeText(hex);
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = `تم نسخ الكود: ${hex}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }
};

/* ===================================================================
   5. ANATOMY OF THE LOGO (HOTSPOTS & LEGEND)
=================================================================== */
function initAnatomyInteraction() {
  const hotspots = document.querySelectorAll('.hotspot');
  const legendItems = document.querySelectorAll('.legend-item');

  legendItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      highlightItem(index);
    });

    item.addEventListener('mouseleave', () => {
      resetHighlights();
    });

    item.addEventListener('click', () => {
      highlightItem(index);
    });
  });

  hotspots.forEach((spot, index) => {
    spot.addEventListener('mouseenter', () => {
      highlightItem(index);
    });

    spot.addEventListener('mouseleave', () => {
      resetHighlights();
    });
  });

  function highlightItem(idx) {
    hotspots.forEach((spot, i) => {
      if (i === idx) {
        spot.classList.add('active');
      } else {
        spot.classList.remove('active');
      }
    });

    legendItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function resetHighlights() {
    hotspots.forEach(spot => spot.classList.remove('active'));
    legendItems.forEach(item => item.classList.remove('active'));
  }
}

/* ===================================================================
   6. DM PATTERN CANVASES GENERATION
=================================================================== */
function initPatternCanvases() {
  // Main Pattern Canvas
  const mainCanvas = document.getElementById('dmPatternCanvas');
  if (mainCanvas) {
    drawDMPattern(mainCanvas, {
      bg: '#F8FAFD',
      stroke: 'rgba(21, 101, 192, 0.18)',
      accent: 'rgba(41, 182, 246, 0.28)',
      size: 70
    });
  }

  // Mini preview in visual style
  const miniCanvas = document.getElementById('miniPattern');
  if (miniCanvas) {
    drawDMPattern(miniCanvas, {
      bg: '#FFFFFF',
      stroke: 'rgba(21, 101, 192, 0.2)',
      accent: 'rgba(41, 182, 246, 0.3)',
      size: 45
    });
  }

  // Dark variant
  const pvDark = document.getElementById('pvDark');
  if (pvDark) {
    drawDMPattern(pvDark, {
      bg: '#0A1224',
      stroke: 'rgba(41, 182, 246, 0.22)',
      accent: 'rgba(30, 136, 229, 0.35)',
      size: 50
    });
  }

  // Light variant
  const pvLight = document.getElementById('pvLight');
  if (pvLight) {
    drawDMPattern(pvLight, {
      bg: '#FFFFFF',
      stroke: 'rgba(21, 101, 192, 0.15)',
      accent: 'rgba(41, 182, 246, 0.25)',
      size: 50
    });
  }

  // Blue variant
  const pvMid = document.getElementById('pvMid');
  if (pvMid) {
    drawDMPattern(pvMid, {
      bg: '#0D2B8E',
      stroke: 'rgba(255, 255, 255, 0.22)',
      accent: 'rgba(41, 182, 246, 0.4)',
      size: 50
    });
  }

  /**
   * Helper function to draw the isometric geometric DM pattern
   */
  function drawDMPattern(canvas, options) {
    const parent = canvas.parentElement;
    const width = canvas.width = parent.clientWidth || 300;
    const height = canvas.height = parent.clientHeight || 150;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, width, height);

    const s = options.size;
    const rowHeight = s * 0.86;

    let row = 0;
    for (let y = -s; y < height + s * 2; y += rowHeight) {
      const offsetX = (row % 2 === 0) ? 0 : s * 0.75;
      for (let x = -s; x < width + s * 2; x += s * 1.5) {
        drawDMSymbol(ctx, x + offsetX, y, s * 0.45, options);
      }
      row++;
    }
  }

  /**
   * Draw an individual geometric DM isometric emblem
   */
  function drawDMSymbol(ctx, cx, cy, r, opts) {
    ctx.save();
    ctx.translate(cx, cy);

    // Hexagon border
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const hx = r * Math.cos(angle);
      const hy = r * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.strokeStyle = opts.stroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Geometric DM inner details
    ctx.beginPath();
    // Human head dot at top
    ctx.arc(0, -r * 0.42, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = opts.accent;
    ctx.fill();

    // D and M stylized lines
    ctx.beginPath();
    // Left D spine
    ctx.moveTo(-r * 0.5, -r * 0.15);
    ctx.lineTo(-r * 0.5, r * 0.5);
    ctx.lineTo(-r * 0.15, r * 0.3);
    ctx.lineTo(-r * 0.15, 0);
    ctx.lineTo(-r * 0.5, -r * 0.15);

    // Right M polygon
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.25, -r * 0.3);
    ctx.lineTo(r * 0.5, 0);
    ctx.lineTo(r * 0.5, r * 0.5);
    ctx.lineTo(r * 0.3, r * 0.4);
    ctx.lineTo(r * 0.3, r * 0.15);
    ctx.lineTo(r * 0.1, r * 0.3);

    ctx.strokeStyle = opts.accent;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.restore();
  }
}

