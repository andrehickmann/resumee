import { mount } from '@vue/test-utils';
import SideProjects from '../SideProjects.vue';

const rd = {
  sideTitle: 'Was ich nebenbei baue',
  sideIntro: 'Intro',
  sideCommand: '$ ls -la ~/side-projects',
  sideLiveLabel: 'Live'
};

const withShots = {
  name: 'Family Dashboard',
  year: '2025 – heute',
  status: 'aktiv',
  tagline: 'Tagline',
  description: 'Description',
  stack: ['Claude API'],
  shots: [
    { src: '/projects/a.png', label: 'Übersicht' },
    { src: '/projects/b.png', label: 'Prognose' }
  ],
  links: { code: '', live: 'https://example.test' }
};

const singleShot = {
  ...withShots,
  name: 'resumee',
  shots: [{ src: '/projects/resumee.png', label: 'Portfolio v2' }],
  links: { code: 'https://github.com/andrehickmann/resumee', live: '' }
};

describe('SideProjects', () => {
  it('derives the folder slug from the project name', () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [withShots] } });
    expect(wrapper.find('.side-meta .slug').text()).toBe('family-dashboard/');
  });

  it('shows the first screenshot and switches on tab click', async () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [withShots] } });
    expect(wrapper.find('.shot-frame img').attributes('src')).toBe('/projects/a.png');
    expect(wrapper.findAll('.shot-tab')[0].classes()).toContain('is-active');

    await wrapper.findAll('.shot-tab')[1].trigger('click');
    expect(wrapper.find('.shot-frame img').attributes('src')).toBe('/projects/b.png');
    expect(wrapper.findAll('.shot-tab')[1].classes()).toContain('is-active');
  });

  it('omits the tab row for a project with a single screenshot', () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [singleShot] } });
    expect(wrapper.find('.shot-tabs').exists()).toBe(false);
  });

  it('leaves out links that have no URL', () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [withShots] } });
    const links = wrapper.findAll('.side-links a');
    expect(links).toHaveLength(1);
    expect(links[0].text()).toContain('open Live');
  });

  it('renders the repository link when the project has a public repo', () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [singleShot] } });
    expect(wrapper.find('.side-links a').text()).toContain('gh repo view resumee');
  });

  it('resets the chosen screenshot when the project list is swapped', async () => {
    const wrapper = mount(SideProjects, { props: { rd, projects: [withShots] } });
    await wrapper.findAll('.shot-tab')[1].trigger('click');
    expect(wrapper.find('.shot-frame img').attributes('src')).toBe('/projects/b.png');

    await wrapper.setProps({ projects: [{ ...withShots }] });
    expect(wrapper.find('.shot-frame img').attributes('src')).toBe('/projects/a.png');
  });
});
