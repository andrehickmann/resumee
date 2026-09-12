import { mount } from '@vue/test-utils';
import CommandPalette from '../CommandPalette.vue';

const rd = { paletteTitle: 'Springe zu …', paletteEmpty: 'Nichts gefunden' };

const items = [
  { key: 'section-profil', label: 'Profil', type: 'Sektion', run: () => {} },
  { key: 'tag-Vue', label: 'Vue', type: 'Filter', run: () => {} }
];

describe('CommandPalette', () => {
  it('stays out of the DOM while closed', () => {
    const wrapper = mount(CommandPalette, { props: { open: false, query: '', items, rd } });
    expect(wrapper.find('.palette').exists()).toBe(false);
  });

  it('lists every item with its type', () => {
    const wrapper = mount(CommandPalette, { props: { open: true, query: '', items, rd } });
    const entries = wrapper.findAll('.palette-item');
    expect(entries).toHaveLength(2);
    expect(entries[1].text()).toContain('Filter');
  });

  it('emits the picked item', async () => {
    const wrapper = mount(CommandPalette, { props: { open: true, query: '', items, rd } });
    await wrapper.findAll('.palette-item')[0].trigger('click');
    expect(wrapper.emitted('run')?.[0]).toEqual([items[0]]);
  });

  it('emits the typed query', async () => {
    const wrapper = mount(CommandPalette, { props: { open: true, query: '', items, rd } });
    await wrapper.find('input').setValue('vue');
    expect(wrapper.emitted('update:query')?.[0]).toEqual(['vue']);
  });

  it('closes on a click next to the panel, not inside it', async () => {
    const wrapper = mount(CommandPalette, { props: { open: true, query: '', items, rd } });
    await wrapper.find('.palette').trigger('click');
    expect(wrapper.emitted('close')).toBeFalsy();

    await wrapper.find('.palette-backdrop').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('says so when nothing matches', () => {
    const wrapper = mount(CommandPalette, { props: { open: true, query: 'zzz', items: [], rd } });
    expect(wrapper.find('.palette-empty').text()).toBe('Nichts gefunden');
  });
});
