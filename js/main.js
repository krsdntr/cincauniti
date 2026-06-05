/* ============================================================
   CINCAUNITI — main.js v2
   Interactions, Animations, Navigation
   ============================================================ */

'use strict';

// ─── NAVBAR SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');

function onScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// ─── MOBILE MENU ────────────────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
}

// Close when a nav link is clicked
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


// ─── SMOOTH SCROLL ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 70;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ─── SCROLL-TRIGGERED ANIMATIONS ────────────────────────────────
const animEls = document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale');

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
);

animEls.forEach(el => io.observe(el));

// Immediately trigger elements already in viewport on load
document.addEventListener('DOMContentLoaded', () => {
  animEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
});


// ─── PRODUCT FILTER ─────────────────────────────────────────────
const tabBtns      = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card[data-cat]');

tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const cat = this.dataset.filter;

    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');

    productCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      if (match) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// ─── COUNTER ANIMATION ──────────────────────────────────────────
function animateCount(el, target, duration = 1400) {
  const isFloat = target.toString().includes('.');
  const suffix  = el.dataset.suffix || '';
  const start   = performance.now();

  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (isFloat ? (eased * target).toFixed(1) : Math.round(eased * target)) + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      if (!isNaN(target)) animateCount(el, target);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));


// ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionIO.observe(s));


// ─── PRODUCT ORDER BUTTON (dynamic WA message) ──────────────────
document.querySelectorAll('.product-cta').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const card = this.closest('.product-card');
    const name = card ? (card.querySelector('.product-name')?.textContent.trim() || '') : '';
    const msg  = encodeURIComponent(`Halo Cincauniti! 🌿 Saya ingin pesan ${name}. Mohon info ketersediaan dan cara ordernya ya 😊`);
    window.open(`https://wa.me/6281213079617?text=${msg}`, '_blank', 'noopener');
  });
});


// ─── GALLERY CLICK ──────────────────────────────────────────────
document.querySelectorAll('.gallery-item[data-href]').forEach(item => {
  item.addEventListener('click', () => window.open(item.dataset.href, '_blank', 'noopener'));
  item.style.cursor = 'pointer';
});


// ─── HERO PARALLAX (subtle) ─────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.5) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
  }, { passive: true });
}


// ─── REDUCE MOTION ──────────────────────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--dur-fast',  '0ms');
  document.documentElement.style.setProperty('--dur-base',  '0ms');
  document.documentElement.style.setProperty('--dur-slow',  '0ms');
  document.documentElement.style.setProperty('--dur-xslow', '0ms');
}



// ─── HERO IMAGE SLIDESHOW ────────────────────────────────────────
(function initHeroSlider() {
  const slider  = document.getElementById('heroSlider');
  if (!slider) return;

  const slides  = slider.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.slide-dot');
  const INTERVAL = 4200;        // ms between transitions
  const REDUCED  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current  = 0;
  let timer    = null;

  // Set first slide active on load
  slides[0]?.classList.add('active');

  function goTo(next) {
    const prev = current;
    if (next === prev) return;

    // Exit: mark current as prev (fade + scale down), then clean up
    slides[prev].classList.remove('active');
    slides[prev].classList.add('prev');

    // Clean prev class after transition ends (1.0s)
    const outSlide = slides[prev];
    setTimeout(() => outSlide.classList.remove('prev'), 1050);

    // Enter: mark next as active (fade + Ken Burns)
    slides[next].classList.remove('prev');
    slides[next].classList.add('active');

    // Dots
    dots.forEach((d, i) => d.classList.toggle('active', i === next));

    current = next;
  }

  function advance() {
    goTo((current + 1) % slides.length);
  }

  function startTimer() {
    if (REDUCED) return;
    clearInterval(timer);
    timer = setInterval(advance, INTERVAL);
  }

  function stopTimer() { clearInterval(timer); }

  // Pause on hover
  slider.addEventListener('mouseenter', stopTimer);
  slider.addEventListener('mouseleave', startTimer);

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide, 10);
      goTo(idx);
      startTimer(); // reset timer on manual select
    });
  });

  startTimer();
})();


// ─── INIT LOG ────────────────────────────────────────────────────
console.log('🌿 Cincauniti v2 loaded.');
