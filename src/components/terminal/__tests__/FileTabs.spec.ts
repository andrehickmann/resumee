import { mount } from '@vue/test-utils';
import FileTabs from '../FileTabs.vue';

const files = [
  { id: 'profil', file: 'profil.md', icon: '#', color: '#a78bfa' },
  { id: 'stack', file: 'stack.json', icon: '{}', color: '#5fe0ff' }
];

const WIDE_FILES = [
  { id: 'a', file: 'a.md', icon: '#', color: '#fff' },
  { id: 'b', file: 'b.md', icon: '#', color: '#fff' },
  { id: 'c', file: 'c.md', icon: '#', color: '#fff' }
];

/**
 * happy-dom reports every box as zero-sized, so the strip geometry is supplied by
 * hand: a window of `width` onto three 150px tabs.
 */
function mountStrip(active = 'a', width = 200) {
  const wrapper = mount(FileTabs, {
    props: { files: WIDE_FILES, active },
    attachTo: document.body
  });
  const strip = wrapper.find('.term-tabs').element as HTMLElement;
  Object.defineProperty(strip, 'clientWidth', { value: width, configurable: true });
  strip.scrollLeft = 0;
  const scrollTo = vi.fn();
  strip.scrollTo = scrollTo as unknown as typeof strip.scrollTo;
  wrapper.findAll('.term-tab').forEach((tab, index) => {
    const el = tab.element as HTMLElement;
    Object.defineProperty(el, 'offsetLeft', { value: index * 150, configurable: true });
    Object.defineProperty(el, 'offsetWidth', { value: 150, configurable: true });
  });
  return { wrapper, strip, scrollTo };
}

describe('FileTabs', () => {
  it('marks only the active file', () => {
    const wrapper = mount(FileTabs, { props: { files, active: 'stack' } });
    const tabs = wrapper.findAll('.term-tab');
    expect(tabs[0].classes()).not.toContain('is-active');
    expect(tabs[1].classes()).toContain('is-active');
  });

  it('keeps the anchor href so the tabs still work without JavaScript', () => {
    const wrapper = mount(FileTabs, { props: { files, active: 'profil' } });
    expect(wrapper.findAll('.term-tab')[1].attributes('href')).toBe('#stack');
  });

  it('emits the section id instead of letting the browser jump', async () => {
    const wrapper = mount(FileTabs, { props: { files, active: 'profil' } });
    await wrapper.findAll('.term-tab')[1].trigger('click');
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['stack']);
  });

  it('scrolls a tab that sits past the right edge into view', async () => {
    const { wrapper, scrollTo } = mountStrip('a');
    await wrapper.setProps({ active: 'c' });
    // Third tab ends at 450, the window is 200 wide: 450 - 200 + 16 padding.
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 266 }));
    wrapper.unmount();
  });

  it('scrolls back when the active tab sits past the left edge', async () => {
    const { wrapper, strip, scrollTo } = mountStrip('c');
    strip.scrollLeft = 266;
    await wrapper.setProps({ active: 'a' });
    // Tab starts at 0, so the strip goes back to the very beginning.
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 0 }));
    wrapper.unmount();
  });

  it('leaves the strip alone when the active tab is already visible', async () => {
    // 320px window: the first two tabs (0-300) fit without any scrolling.
    const { wrapper, scrollTo } = mountStrip('a', 320);
    await wrapper.setProps({ active: 'b' });
    expect(scrollTo).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});
