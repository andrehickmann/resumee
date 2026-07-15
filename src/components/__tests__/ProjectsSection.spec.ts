import { mount } from '@vue/test-utils';
import ProjectsSection from '../ProjectsSection.vue';

type Project = {
  id: string;
  title: string;
  period: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

const copy = {
  projectsTitle: 'Projects',
  projectsIntro: 'Intro',
  projectsCountLabel: 'projects',
  filterToggleLabel: 'Filters',
  filterTechLabel: 'Tech',
  filterYearLabel: 'Years',
  filterResetLabel: 'Reset'
};

const sampleProject: Project = {
  id: 'test-project',
  title: 'Test',
  period: '2024',
  start: 2024,
  end: 2024,
  description: 'Desc',
  tags: ['Vue']
};

describe('ProjectsSection', () => {
  it('emits toggle-filter when tag clicked', async () => {
    const wrapper = mount(ProjectsSection, {
      props: {
        copy,
        filteredCount: 1,
        activeFiltersCount: 0,
        projectTags: ['Vue'],
        projectYears: [2024],
        filteredProjects: [sampleProject],
        isTagActive: () => false,
        isYearActive: () => false
      }
    });

    await wrapper.find('.filters .filter').trigger('click');
    expect(wrapper.emitted('toggle-filter')).toBeTruthy();
  });

  it('emits open-project on card click', async () => {
    const wrapper = mount(ProjectsSection, {
      props: {
        copy,
        filteredCount: 1,
        activeFiltersCount: 0,
        projectTags: ['Vue'],
        projectYears: [2024],
        filteredProjects: [sampleProject],
        isTagActive: () => false,
        isYearActive: () => false
      }
    });

    await wrapper.find('.project-card').trigger('click');
    expect(wrapper.emitted('open-project')).toBeTruthy();
  });
});
