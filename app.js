/* ============================================================
   ATELIER — interaction & motion layer
   ============================================================ */
(function () {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  let lenis = null;
  function initLenis() {
    if (prefersReduced || typeof Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  function scrollTo(target) {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  /* ---------- SPLIT TEXT (chars) ---------- */
  function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    const frag = document.createDocumentFragment();
    text.split('').forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'split-char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      frag.appendChild(s);
    });
    el.appendChild(frag);
    return el.querySelectorAll('.split-char');
  }

  /* ---------- PRELOADER (OPTIMIZED FOR FAST LOAD) ---------- */
  function runPreloader(done) {
    const pre = document.getElementById('preloader');
    const countEl = document.getElementById('plCount');
    const bar = document.getElementById('plBar');
    const word = pre ? pre.querySelector('.pl-word') : null;
    const sub = pre ? pre.querySelector('.pl-sub') : null;
    if (!pre) { done(); return; }
    document.body.style.overflow = 'hidden';

    if (hasGSAP && !prefersReduced && !isTouch) {
      gsap.to(word, { y: 0, duration: 0.5, ease: 'power4.out', delay: 0.05 });
      gsap.to(sub, { opacity: 1, duration: 0.5, delay: 0.2 });
      const state = { v: 0 };
      gsap.to(state, {
        v: 100, duration: 0.6, ease: 'power2.out', delay: 0.1,
        onUpdate() {
          const val = Math.round(state.v);
          countEl.textContent = String(val).padStart(2, '0');
          bar.style.width = val + '%';
        },
        onComplete() {
          const tl = gsap.timeline({ onComplete: () => { pre.style.display = 'none'; document.body.style.overflow = ''; done(); } });
          tl.to('.preloader__inner', { y: -30, opacity: 0, duration: 0.3, ease: 'power3.in' })
            .to('.preloader__curtain', { y: 0, duration: 0.4, ease: 'power4.inOut' }, '-=0.1')
            .set(pre, { autoAlpha: 0 });
        }
      });
    } else {
      countEl.textContent = '100';
      pre.style.display = 'none';
      document.body.style.overflow = '';
      done();
    }
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    if (isTouch) return;
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    const label = document.getElementById('cursorLabel');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    function loop() {
      cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      const type = el.getAttribute('data-cursor');
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-' + type);
        if (type === 'view') label.textContent = 'View';
        else if (type === 'hover') label.textContent = '';
        else if (type === 'scroll') label.textContent = '';
      });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('is-' + type); label.textContent = ''; });
    });
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  function initMagnetic() {
    if (isTouch) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    });
  }

  /* ---------- TEXT SCRAMBLE (section titles) ---------- */
  const CHARS = '!<>-_\\/[]{}—=+*^?#________';
  function scramble(el, finalText, duration) {
    let frame = 0;
    const total = duration || 40;
    const queue = [];
    for (let i = 0; i < finalText.length; i++) {
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ char: finalText[i], start, end });
    }
    function update() {
      let out = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) { complete++; out += q.char; }
        else if (frame >= q.start) {
          if (!q.r || Math.random() < 0.28) q.r = CHARS[Math.floor(Math.random() * CHARS.length)];
          out += `<span style="color:var(--accent)">${q.r}</span>`;
        } else { out += q.char === ' ' ? ' ' : ''; }
      }
      el.innerHTML = out;
      if (complete === queue.length) { el.textContent = finalText; return; }
      frame++;
      requestAnimationFrame(update);
    }
    update();
  }

  /* ---------- HERO ANIMATION ---------- */
  function initHero() {
    const words = document.querySelectorAll('.hero__title .word');
    const frame = document.querySelector('.hero__portrait-frame');
    if (hasGSAP && !prefersReduced) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(frame, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.out' })
        .to('.hero__portrait-frame img', { scale: 1, duration: 1.6, ease: 'power3.out' }, '<')
        .to(words, { y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 }, '-=1.1')
        .from('.hero__meta, .hero__cta-row', { opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.6');
    } else {
      words.forEach((w) => (w.style.transform = 'translateY(0)'));
      if (frame) frame.style.clipPath = 'inset(0)';
    }

    // Mouse parallax
    if (!isTouch && !prefersReduced) {
      const portrait = document.querySelector('.hero__portrait');
      const bgWord = document.querySelector('.hero__bg-word');
      document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const dx = (e.clientX / window.innerWidth - 0.5);
        const dy = (e.clientY / window.innerHeight - 0.5);
        if (portrait) portrait.style.transform = `translate(-50%,-46%) translate(${dx * 30}px, ${dy * 24}px)`;
        if (bgWord) bgWord.style.transform = `translate(-50%,-50%) translate(${dx * -40}px, ${dy * -20}px)`;
      });
    }

    // Role rotator
    const roles = ['scalable web applications', 'React & Node.js systems', 'responsive user interfaces', 'efficient C++ algorithms'];
    const rot = document.getElementById('roleRotate');
    if (rot) {
      let i = 0;
      const span = rot.querySelector('span');
      setInterval(() => {
        if (!hasGSAP || prefersReduced) { i = (i + 1) % roles.length; span.textContent = roles[i]; return; }
        gsap.to(span, { y: '-100%', opacity: 0, duration: 0.5, ease: 'power2.in', onComplete() {
          i = (i + 1) % roles.length; span.textContent = roles[i];
          gsap.fromTo(span, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' });
        } });
      }, 2600);
    }
  }

  /* ---------- SCROLL REVEALS ---------- */
  function initReveals() {
    // Section titles -> split reveal + scramble
    document.querySelectorAll('.reveal-text').forEach((el) => {
      const original = el.textContent;
      const chars = splitChars(el);
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (hasGSAP && !prefersReduced) gsap.to(chars, { y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03 });
            else chars.forEach((c) => (c.style.transform = 'translateY(0)'));
            o.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });

    // Generic reveal-up (with stagger for grids)
    const upObs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-up').forEach((el, idx) => {
      el.style.transitionDelay = ((idx % 3) * 0.08) + 's';
      upObs.observe(el);
    });

    // Image clip reveals
    const imgObs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } });
    }, { threshold: 0.25 });
    document.querySelectorAll('.reveal-img').forEach((el) => imgObs.observe(el));

    // Paragraph line reveals
    document.querySelectorAll('.reveal-lines').forEach((el) => {
      el.classList.add('reveal-line');
      const inner = document.createElement('span');
      inner.innerHTML = el.innerHTML;
      el.innerHTML = '';
      el.appendChild(inner);
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } });
      }, { threshold: 0.2 });
      obs.observe(el);
    });
  }

  /* ---------- COUNTERS ---------- */
  function initCounters() {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (hasGSAP && !prefersReduced) {
          const s = { v: 0 };
          gsap.to(s, { v: target, duration: 2, ease: 'power2.out', onUpdate() { el.textContent = Math.round(s.v); } });
        } else { el.textContent = target; }
        o.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => obs.observe(el));
  }

  /* ---------- MARQUEE ---------- */
  function initMarquee() {
    const track = document.getElementById('marquee1');
    if (!track || !hasGSAP || prefersReduced) return;
    const width = track.scrollWidth / 2;
    gsap.to(track, { x: -width, duration: 22, ease: 'none', repeat: -1 });
  }

  /* ---------- NAV STATE + ACTIVE SECTION ---------- */
  function initNav() {
    const nav = document.getElementById('nav');
    const progress = document.getElementById('scrollProgress');
    const links = Array.from(document.querySelectorAll('.nav__link'));

    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle('is-solid', y > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active section
    const sections = ['about', 'work', 'skills', 'process', 'contact'];
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('data-section') === id));
        }
      });
    }, { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* ---------- MOBILE MENU ---------- */
  function initMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const nav = document.getElementById('nav');
    if (!burger) return;
    function toggle(open) {
      menu.classList.toggle('is-open', open);
      nav.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && lenis) lenis.stop(); else if (lenis) lenis.start();
      if (open && hasGSAP && !prefersReduced) {
        gsap.fromTo('.menu__list li', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power4.out', delay: 0.25 });
        gsap.fromTo('.menu__footer', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.6 });
      }
    }
    burger.addEventListener('click', () => toggle(!menu.classList.contains('is-open')));
    document.querySelectorAll('[data-menu]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault(); toggle(false);
      setTimeout(() => scrollTo(a.getAttribute('href')), 400);
    }));
  }

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  function initAnchors() {
    document.querySelectorAll('[data-scroll]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) { e.preventDefault(); scrollTo(href); }
      });
    });
    const top = document.getElementById('backToTop');
    if (top) top.addEventListener('click', () => { if (lenis) lenis.scrollTo(0, { duration: 1.6 }); else window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- CONTACT FORM (EMAIL SERVICE INTEGRATION) ---------- */
  function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const success = document.getElementById('formSuccess');
    const submitText = document.getElementById('submitText');

    // EmailJS Credentials Configuration
    // -------------------------------------------------------------
    // To send emails silently via EmailJS without opening email client:
    // 1. Create a free account at https://www.emailjs.com
    // 2. Add an Email Service (e.g., Gmail) -> get SERVICE_ID
    // 3. Create an Email Template -> get TEMPLATE_ID
    // 4. Copy Account Public Key -> get PUBLIC_KEY
    // Replace the placeholders below:
    const EMAILJS_SERVICE_ID = 'service_svfbuux';
    const EMAILJS_TEMPLATE_ID = 'template_ixl81qh';
    const EMAILJS_PUBLIC_KEY = 'WFs7aOdipjvnienJy';

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const originalText = submitText.textContent;
      submitText.textContent = 'Sending…';

      const name = form.name.value;
      const email = form.email.value;
      const subject = form.subject.value || 'Portfolio Contact Inquiry';
      const message = form.message.value;

      try {
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          // Send email directly using EmailJS
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            name: name,
            email: email,
            reply_to: email,
            subject: subject,
            message: message,
            to_email: 'multanijarir08@gmail.com'
          });
          submitText.textContent = 'Sent Successfully!';
        } else {
          // Smart Fallback: Pre-fill mailto client if keys are default placeholders
          const mailtoUrl = `mailto:multanijarir08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
          window.location.href = mailtoUrl;
          submitText.textContent = 'Email Client Opened';
        }

        success.classList.add('show');
        form.reset();
        setTimeout(() => {
          submitText.textContent = originalText;
          success.classList.remove('show');
        }, 5000);
      } catch (err) {
        console.error('Email Dispatch Error:', err);
        // Backup fallback on error
        const mailtoUrl = `mailto:multanijarir08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        submitText.textContent = 'Email Client Opened';
        success.classList.add('show');
        form.reset();
        setTimeout(() => {
          submitText.textContent = originalText;
          success.classList.remove('show');
        }, 5000);
      }
    });
  }

  /* ---------- PARALLAX (scroll) ---------- */
  function initParallax() {
    if (!hasGSAP || prefersReduced || isTouch) return;
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      gsap.to(el, {
        yPercent: amt * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
      });
    });
    // subtle scroll-driven float on bg word
    const bg = document.getElementById('floatWord');
    if (bg) gsap.to(bg, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- BOOT (FAST INITIALIZATION) ---------- */
  function boot() {
    initCursor();
    runPreloader(() => {
      initLenis();
      initHero();
      initReveals();
      initCounters();
      initMarquee();
      initNav();
      initMenu();
      initAnchors();
      initForm();
      initMagnetic();
      initParallax();
      if (hasGSAP && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
