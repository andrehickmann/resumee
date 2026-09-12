import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { useScrollSpy } from '../useScrollSpy';

const IDS = ['profil', 'stack', 'branchen', 'kontakt'];

function setScrollHeight(value: number) {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value,
    configurable: true
  });
}

/**
 * Places every section at a fixed offset from the viewport top. happy-dom reports
 * zero-sized rects, so the geometry has to be supplied by hand.
 */
function placeSections(tops: Record<string, number>) {
  IDS.forEach((id) => {
    const element = document.createElement('section');
    element.id = id;
    element.getBoundingClientRect = () => ({ top: tops[id] }) as DOMRect;
    document.body.appendChild(element);
  });
}

function mountSpy() {
  let api: ReturnType<typeof useScrollSpy> | undefined;
  const wrapper = mount(
    defineComponent({
      setup() {
        api = useScrollSpy(IDS, { bottom: 'kontakt', alias: { branchen: 'stack' } });
        return () => h('div');
      }
    })
  );
  return { wrapper, api: api as ReturnType<typeof useScrollSpy> };
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.innerWidth = 1280;
    window.innerHeight = 1000;
    window.scrollY = 0;
    setScrollHeight(5000);
  });

  it('activates the last section above 35% of the viewport height', () => {
    placeSections({ profil: -800, stack: 200, branchen: 900, kontakt: 1500 });
    const { api, wrapper } = mountSpy();
    expect(api.active.value).toBe('stack');
    wrapper.unmount();
  });

  it('folds a section without a tab onto its alias', () => {
    placeSections({ profil: -1200, stack: -600, branchen: 100, kontakt: 1500 });
    const { api, wrapper } = mountSpy();
    expect(api.active.value).toBe('stack');
    wrapper.unmount();
  });

  it('falls back to the first section while the page sits at the top', () => {
    placeSections({ profil: 0, stack: 900, branchen: 1400, kontakt: 2000 });
    const { api, wrapper } = mountSpy();
    expect(api.active.value).toBe('profil');
    wrapper.unmount();
  });

  it('hands the last section the highlight at the very bottom of the page', () => {
    placeSections({ profil: -4000, stack: -3000, branchen: -2000, kontakt: -100 });
    window.scrollY = 4000;
    const { api, wrapper } = mountSpy();
    expect(api.active.value).toBe('kontakt');
    wrapper.unmount();
  });
});
