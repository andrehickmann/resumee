import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import BugFixSprint from '../BugFixSprint.vue';

const copy = {
  sprintTitle: 'Bug-Fix Sprint',
  sprintIntro: 'Intro',
  sprintScore: 'Score',
  sprintHighscore: 'Highscore',
  sprintCombo: 'Combo',
  sprintTime: 'Time',
  sprintStart: 'Start',
  sprintRunning: 'Running…'
};

describe('BugFixSprint', () => {
  it('starts game and counts down', async () => {
    vi.useFakeTimers();
    const wrapper = mount(BugFixSprint, { props: { copy } });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.text()).toContain(copy.sprintRunning);

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('9s');
    vi.useRealTimers();
  });
});
