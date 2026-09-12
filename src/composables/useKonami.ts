import { onMounted, onUnmounted, ref } from 'vue';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

/** How many facts the overlay shows per run. */
const FACT_COUNT = 4;

export function pickFacts(facts: string[], count = FACT_COUNT) {
  return [...facts].sort(() => Math.random() - 0.5).slice(0, count);
}

/** Watches for the Konami code and calls `onComplete` when the full sequence arrives. */
export function useKonami(onComplete: () => void) {
  const index = ref(0);

  function handleKeydown(event: KeyboardEvent) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key !== SEQUENCE[index.value]) {
      // A wrong key may still be the start of a fresh attempt.
      index.value = key === SEQUENCE[0] ? 1 : 0;
      return;
    }
    index.value += 1;
    if (index.value === SEQUENCE.length) {
      index.value = 0;
      onComplete();
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown));
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown));

  return { handleKeydown };
}
