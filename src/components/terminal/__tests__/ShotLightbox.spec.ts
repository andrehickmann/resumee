import { mount } from '@vue/test-utils';
import ShotLightbox from '../ShotLightbox.vue';

const shots = [
  { src: '/projects/a.png', label: 'Übersicht' },
  { src: '/projects/b.png', label: 'Prognose' },
  { src: '/projects/c.png', label: 'Konten' }
];

function factory(overrides = {}) {
  return mount(ShotLightbox, {
    props: { open: true, shots, index: 0, title: 'Fintara', hint: 'ziehen', ...overrides },
    attachTo: document.body
  });
}

describe('ShotLightbox', () => {
  it('stays out of the DOM while closed', () => {
    const wrapper = mount(ShotLightbox, {
      props: { open: false, shots, index: 0, title: 'Fintara', hint: 'ziehen' }
    });
    expect(wrapper.find('.lightbox').exists()).toBe(false);
  });

  it('shows the selected screenshot unclipped', () => {
    const wrapper = factory({ index: 1 });
    const image = wrapper.find('.lightbox-canvas img');
    expect(image.attributes('src')).toBe('/projects/b.png');
    expect(image.attributes('alt')).toBe('Fintara — Prognose');
  });

  it('names the project and the screenshot in the chrome bar', () => {
    expect(factory().find('.shot-chrome .url').text()).toBe('Fintara — Übersicht');
  });

  it('closes on the backdrop but not on the frame', async () => {
    const wrapper = factory();
    await wrapper.find('.lightbox-frame').trigger('click');
    expect(wrapper.emitted('close')).toBeFalsy();

    await wrapper.find('.lightbox').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('closes on the ESC button', async () => {
    const wrapper = factory();
    await wrapper.find('.lightbox-close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('steps through the screenshots with the arrow keys and wraps around', async () => {
    const wrapper = factory({ index: 2 });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(wrapper.emitted('select')?.[0]).toEqual([0]);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(wrapper.emitted('select')?.[1]).toEqual([1]);
    wrapper.unmount();
  });

  it('closes on Escape', () => {
    const wrapper = factory();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.emitted('close')).toBeTruthy();
    wrapper.unmount();
  });

  it('stops listening once closed', async () => {
    const wrapper = factory();
    await wrapper.setProps({ open: false });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.emitted('close')).toBeFalsy();
  });

  it('offers a tab per screenshot and marks the current one', () => {
    const wrapper = factory({ index: 1 });
    const tabs = wrapper.findAll('.lightbox-tabs .shot-tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1].classes()).toContain('is-active');
  });

  it('hides the tab row for a single screenshot', () => {
    expect(
      factory({ shots: [shots[0]] })
        .find('.lightbox-tabs')
        .exists()
    ).toBe(false);
  });
});
