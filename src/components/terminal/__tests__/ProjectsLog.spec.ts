import { mount } from '@vue/test-utils';
import ProjectsLog from '../ProjectsLog.vue';

const rd = {
  projectsTitle: 'Kundenprojekte',
  projectsIntro: 'Intro',
  projectsCommand: '$ git log --oneline',
  projectsCountLabel: 'commits',
  more: 'weitere Projekte anzeigen',
  moreHint: 'press to expand',
  less: 'weniger anzeigen'
};

const projects = [
  {
    title: 'Ticketing',
    period: '2024',
    description: 'Ticket sales',
    hash: 'a1b2c3d',
    tagText: 'Web · Payments'
  }
];

function factory(overrides = {}) {
  return mount(ProjectsLog, {
    props: {
      rd,
      tagFilters: [
        { label: 'Alle', active: true },
        { label: 'Vue', active: false }
      ],
      projects,
      filteredCount: 1,
      totalCount: 30,
      hiddenCount: 0,
      showAll: false,
      ...overrides
    }
  });
}

describe('ProjectsLog', () => {
  it('renders a commit line per project', () => {
    const wrapper = factory();
    expect(wrapper.findAll('.log-row')).toHaveLength(1);
    expect(wrapper.find('.log-ref .hash').text()).toBe('a1b2c3d');
    expect(wrapper.find('.log-subject .tags').text()).toBe('(Web · Payments)');
  });

  it('marks the active filter chip and emits the label on click', async () => {
    const wrapper = factory();
    const chips = wrapper.findAll('.log-chip');
    expect(chips[0].classes()).toContain('is-active');
    expect(chips[1].classes()).not.toContain('is-active');

    await chips[1].trigger('click');
    expect(wrapper.emitted('toggle-tag')?.[0]).toEqual(['Vue']);
  });

  it('shows the counter as filtered over total', () => {
    expect(factory().find('.log-count').text()).toBe('1/30 commits');
  });

  it('offers the expand line while rows are hidden', async () => {
    const wrapper = factory({ hiddenCount: 18 });
    const toggle = wrapper.find('.log-toggle');
    expect(toggle.text()).toContain('+ 18 weitere Projekte anzeigen');
    await toggle.trigger('click');
    expect(wrapper.emitted('toggle-all')).toBeTruthy();
  });

  it('switches to the (END) line once everything is shown', () => {
    const wrapper = factory({ hiddenCount: 0, showAll: true });
    expect(wrapper.find('.log-toggle').text()).toContain('(END)');
    expect(wrapper.find('.log-toggle').classes()).toContain('is-end');
  });

  it('hides the toggle when the list fits without expanding', () => {
    expect(factory().find('.log-toggle').exists()).toBe(false);
  });
});
