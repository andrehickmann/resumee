import { mount } from '@vue/test-utils';
import TitleBar from '../TitleBar.vue';

function factory(overrides = {}) {
  return mount(TitleBar, {
    props: { activeFile: 'projekte.log', activeFilter: 'Vue', lang: 'de', ...overrides }
  });
}

describe('TitleBar', () => {
  it('shows the active file and filter in the window path', () => {
    expect(factory().find('.term-path').text()).toBe(
      'andre@berlin: ~/portfolio/projekte.log — Vue'
    );
  });

  it('marks the current language and leaves it unclickable', () => {
    const wrapper = factory();
    const [de, en] = wrapper.findAll('.term-lang button');
    expect(de.classes()).toContain('is-active');
    expect(de.attributes('disabled')).toBeDefined();
    expect(en.classes()).not.toContain('is-active');
  });

  it('emits the other language', async () => {
    const wrapper = factory();
    await wrapper.findAll('.term-lang button')[1].trigger('click');
    expect(wrapper.emitted('set-lang')?.[0]).toEqual(['en']);
  });

  it('opens the palette from the keyboard hint', async () => {
    const wrapper = factory();
    await wrapper.find('.term-kbd').trigger('click');
    expect(wrapper.emitted('open-palette')).toBeTruthy();
  });
});
