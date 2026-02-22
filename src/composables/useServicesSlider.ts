import { nextTick, onUnmounted, ref } from 'vue';

export function useServicesSlider() {
  const showServiceArrows = ref(false);
  const servicesTrack = ref<HTMLElement | null>(null);
  let serviceAutoTimer: ReturnType<typeof setInterval> | null = null;

  function updateServiceControls() {
    const track = servicesTrack.value;
    if (!track) return;
    showServiceArrows.value = track.scrollWidth > track.clientWidth + 4;
  }

  function scrollServices(direction) {
    const track = servicesTrack.value;
    if (!track) return;
    const step = Math.max(track.clientWidth * 0.7, 240);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
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
    updateServiceControls,
    scrollServices,
    initServiceSlider,
    startAuto,
    stopAuto
  };
}
