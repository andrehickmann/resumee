export function useUiEffects() {
  function initScroll() {
    document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.scroll as string);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initNavHighlight() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav a');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initReveal() {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function initScrollEffects() {
    const portraitWrap = document.querySelector<HTMLElement>('.portrait-wrap');
    const blur = document.querySelector<HTMLElement>('.bg-blur');
    if (!portraitWrap || !blur) return;
    let ticking = false;
    const update = () => {
      const offset = Math.min(window.scrollY, 800);
      portraitWrap.style.setProperty('--scroll-shift', `${offset * 0.08}px`);
      blur.style.transform = `translateY(${offset * -0.05}px)`;
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  function initCounters() {
    const counters = document.querySelectorAll<HTMLElement>('[data-count]');
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduce.matches) {
      counters.forEach((item) => {
        item.textContent = item.dataset.count;
      });
      return;
    }
    const parseValue = (value: string) => {
      const numeric = parseInt(value.replace(/\D/g, ''), 10);
      return Number.isNaN(numeric) ? 0 : numeric;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          const value = target.dataset.count;
          const number = parseValue(value);
          const hasPlus = value.includes('+');
          let current = 0;
          const duration = 1100;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(number * progress);
            target.textContent = `${current}${hasPlus ? '+' : ''}`;
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              target.textContent = value;
            }
          };
          requestAnimationFrame(tick);
          observer.unobserve(target);
        });
      },
      { threshold: 0.7 }
    );
    counters.forEach((item) => observer.observe(item));
  }

  function initMagnet() {
    const items = document.querySelectorAll<HTMLElement>('[data-magnet]');
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduce.matches) return;
    items.forEach((item) => {
      item.addEventListener('mousemove', (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  function initTilt() {
    const cards = document.querySelectorAll<HTMLElement>('.tilt');
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduce.matches) return;
    cards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  return {
    initScroll,
    initNavHighlight,
    initReveal,
    initScrollEffects,
    initCounters,
    initMagnet,
    initTilt
  };
}
