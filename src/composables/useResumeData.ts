import { onMounted, ref, watch, type Ref } from 'vue';
import type { ResumeApiResponse, ResumeLocale } from '../types/resumeData';

function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');
  return import.meta.env.DEV ? 'http://localhost:3000' : 'https://api.hickmann-kuschnereit.de';
}

function normalizeLocale(locale: string): ResumeLocale {
  return locale === 'en' ? 'en' : 'de';
}

export function useResumeData(locale: Ref<string>) {
  const data = ref<ResumeApiResponse | null>(null);
  const loading = ref(false);
  const error = ref('');
  let mounted = false;

  async function loadResumeData() {
    const requestedLocale = normalizeLocale(locale.value);
    loading.value = true;
    error.value = '';

    try {
      const response = await fetch(`${getApiBaseUrl()}/v1/resume?locale=${requestedLocale}`);
      if (!response.ok) {
        throw new Error(`Resume API returned ${response.status}`);
      }
      data.value = (await response.json()) as ResumeApiResponse;
    } catch (loadError) {
      error.value = loadError instanceof Error ? loadError.message : 'Resume API request failed';
      data.value = null;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    mounted = true;
    void loadResumeData();
  });

  watch(locale, () => {
    if (mounted) {
      void loadResumeData();
    }
  });

  return {
    resumeData: data,
    resumeLoading: loading,
    resumeError: error,
    reloadResumeData: loadResumeData
  };
}
