import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useResumeData } from '../useResumeData';

const TestHarness = defineComponent({
  setup() {
    const locale = ref('de');
    const resume = useResumeData(locale);
    return { locale, ...resume };
  },
  template: '<button @click="locale = \'en\'">{{ resumeData?.locale || resumeError }}</button>'
});

function mockResume(locale: 'de' | 'en') {
  return {
    locale,
    updatedAt: '2026-04-15T00:00:00.000Z',
    projects: [],
    skills: [],
    services: [],
    industries: [],
    timeline: []
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useResumeData', () => {
  it('loads resume data from the API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(mockResume('de')), { status: 200 }))
    );

    const wrapper = mount(TestHarness);
    await vi.waitFor(() => expect(wrapper.text()).toBe('de'));

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/v1/resume?locale=de');
  });

  it('reloads when the locale changes', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(mockResume('de')), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockResume('en')), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const wrapper = mount(TestHarness);
    await vi.waitFor(() => expect(wrapper.text()).toBe('de'));

    await wrapper.find('button').trigger('click');
    await vi.waitFor(() => expect(wrapper.text()).toBe('en'));

    expect(fetchMock).toHaveBeenLastCalledWith('http://localhost:3000/v1/resume?locale=en');
  });

  it('exposes an error and clears API data when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ error: 'down' }), { status: 503 }))
    );

    const wrapper = mount(TestHarness);
    await vi.waitFor(() => expect(wrapper.text()).toBe('Resume API returned 503'));
  });
});
