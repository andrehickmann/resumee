import { onMounted, onUnmounted, ref } from 'vue';

/** A section counts as active once its top edge has passed this share of the viewport. */
const ACTIVE_LINE_RATIO = 0.35;

/** Tolerance in pixels for detecting the very bottom of the page. */
const BOTTOM_TOLERANCE = 4;

type ScrollSpyOptions = {
  /** Section that wins once the page is scrolled to the bottom. */
  bottom?: string;
  /** Maps a section onto another one, for sections without their own tab. */
  alias?: Record<string, string>;
};

/**
 * Tracks which section the reader is currently looking at. Reads are throttled to one
 * per animation frame because both scroll and resize fire far more often than the
 * result can change.
 */
export function useScrollSpy(ids: string[], options: ScrollSpyOptions = {}) {
  const active = ref(ids[0] ?? '');
  let frame = 0;

  function measure() {
    const line = window.innerHeight * ACTIVE_LINE_RATIO;
    let current = ids[0] ?? '';
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= line) current = id;
    }
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - BOTTOM_TOLERANCE;
    if (atBottom && options.bottom) current = options.bottom;
    active.value = options.alias?.[current] ?? current;
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  }

  onMounted(() => {
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  });

  onUnmounted(() => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  });

  return { active, measure };
}

/** Height of the sticky title bar plus tab bar, subtracted from every anchor jump. */
const HEAD_OFFSET = 72;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - HEAD_OFFSET,
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
}
