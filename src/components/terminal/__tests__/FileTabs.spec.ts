import { mount } from '@vue/test-utils';
import FileTabs from '../FileTabs.vue';

const files = [
  { id: 'profil', file: 'profil.md', icon: '#', color: '#a78bfa' },
  { id: 'stack', file: 'stack.json', icon: '{}', color: '#5fe0ff' }
];

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
});
