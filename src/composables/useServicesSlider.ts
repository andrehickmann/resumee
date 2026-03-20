import { nextTick, onUnmounted, ref } from 'vue';

export function useServicesSlider() {
  const showServiceArrows = ref(false);
  const servicesTrack = ref<HTMLElement | null>(null);
  const currentServiceIndex = ref(0);
  let serviceAutoTimer: ReturnType<typeof setInterval> | null = null;

  function updateServiceControls() {
    const track = servicesTrack.value;
    if (!track) return;
    showServiceArrows.value = track.scrollWidth > track.clientWidth + 4;

    // Calculate current index based on scroll position
    const cards = track.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardEl = card as HTMLElement;
      const cardLeft = cardEl.offsetLeft - track.offsetLeft;
      const distance = Math.abs(track.scrollLeft - cardLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    currentServiceIndex.value = closestIndex;
  }

  function scrollServices(direction) {
    const track = servicesTrack.value;
    if (!track) return;
    const step = Math.max(track.clientWidth * 0.7, 240);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  function gotoService(index: number) {
    const track = servicesTrack.value;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('.service-card'));
    const card = cards[index] as HTMLElement;
    if (!card) return;

    // Get all cards before this one to calculate total scroll distance
    let scrollPosition = 0;
    for (let i = 0; i < index; i++) {
      const prevCard = cards[i] as HTMLElement;
      scrollPosition += prevCard.offsetWidth;
      // Add gap between cards (1.5rem = 24px from styles)
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      scrollPosition += gap;
    }

    track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  function startAuto() {
    if (serviceAutoTimer) return;
    const track = servicesTrack.value;
    if (!track) return;
    serviceAutoTimer = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      const next = track.scrollLeft + track.clientWidth * 0.6;
      track.scrollTo({ left: next >= maxScroll ? 0 : next, behavior: 'smooth' });
    }, 2800);
  }

  function stopAuto() {
    if (serviceAutoTimer) {
      clearInterval(serviceAutoTimer);
      serviceAutoTimer = null;
    }
  }

  function initServiceSlider(trackEl: HTMLElement) {
    servicesTrack.value = trackEl;
    if (!servicesTrack.value) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const setDragging = (value) => {
      servicesTrack.value.classList.toggle('dragging', value);
    };

    servicesTrack.value.addEventListener('mousedown', (event) => {
      isDown = true;
      startX = event.pageX - servicesTrack.value.offsetLeft;
      scrollLeft = servicesTrack.value.scrollLeft;
      setDragging(true);
      stopAuto();
      event.preventDefault();
    });

    servicesTrack.value.addEventListener('mousemove', (event) => {
      if (!isDown) return;
      const x = event.pageX - servicesTrack.value.offsetLeft;
      const walk = (x - startX) * 1.2;
      servicesTrack.value.scrollLeft = scrollLeft - walk;
    });

    const stopDrag = () => {
      isDown = false;
      setDragging(false);
      startAuto();
    };

    servicesTrack.value.addEventListener('mouseleave', stopDrag);
    servicesTrack.value.addEventListener('mouseup', stopDrag);
    servicesTrack.value.addEventListener('mouseenter', stopAuto);
    servicesTrack.value.addEventListener('touchstart', stopAuto, { passive: true });
    servicesTrack.value.addEventListener('touchend', startAuto, { passive: true });
    window.addEventListener('resize', updateServiceControls, { passive: true });

    nextTick(() => updateServiceControls());
    startAuto();
  }

  onUnmounted(() => {
    if (serviceAutoTimer) clearInterval(serviceAutoTimer);
  });

  return {
    showServiceArrows,
    servicesTrack,
    currentServiceIndex,
    updateServiceControls,
    scrollServices,
    gotoService,
    initServiceSlider,
    startAuto,
    stopAuto
  };
}
