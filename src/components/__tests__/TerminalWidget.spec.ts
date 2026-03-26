import { mount } from '@vue/test-utils';
import TerminalWidget from '../TerminalWidget.vue';

const copy = {
  terminalTitle: 'Terminal',
  terminalIntro: 'Intro',
  terminalPlaceholder: 'help',
  terminalHelp: ['help', 'projects'],
  contactEmail: 'Email: test@example.com',
  stackItems: [{ title: 'Frontend', tools: 'Vue' }]
};

describe('TerminalWidget', () => {
  it('renders default help line', () => {
    const wrapper = mount(TerminalWidget, {
      props: { copy, projectCount: 3, industryCount: 2 }
    });
    expect(wrapper.text()).toContain('Type "help"');
  });

  it('handles projects command', async () => {
    const wrapper = mount(TerminalWidget, {
      props: { copy, projectCount: 7, industryCount: 2 }
    });
    const input = wrapper.find('input');
    await input.setValue('projects');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.text()).toContain('Projects: 7');
  });
});
