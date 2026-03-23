import { ref, watch } from 'vue';

const STORAGE_KEY = 'theme-preference';

// Check system preference
const getSystemPreference = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Get stored preference or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
  return stored || getSystemPreference();
};

const isDark = ref(getInitialTheme() === 'dark');

// Apply theme to document
const applyTheme = (dark: boolean) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', dark);
};

// Initialize theme on load
if (typeof document !== 'undefined') {
  applyTheme(isDark.value);
}

// Watch for changes and persist
watch(isDark, (dark) => {
  applyTheme(dark);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }
});

export function useDarkMode() {
  const toggle = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggle
  };
}
