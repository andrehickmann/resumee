import { mount } from '@vue/test-utils';
import ProjectModal from '../ProjectModal.vue';

describe('ProjectModal', () => {
  it('emits close on close button', async () => {
    const wrapper = mount(ProjectModal, {
      props: {
        open: true,
        project: { title: 'Test', period: '2024', description: 'Desc', tags: ['Vue'] }
      }
    });

    await wrapper.find('button.modal-close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
