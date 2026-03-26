import { mount } from '@vue/test-utils';
import ContactModal from '../ContactModal.vue';

const copy = {
  modalTitle: 'Contact',
  formName: 'Name',
  formEmail: 'Email',
  formRole: 'Role',
  formMessage: 'Message',
  contactButton: 'Send'
};

describe('ContactModal', () => {
  it('emits submit on form submit', async () => {
    const wrapper = mount(ContactModal, {
      props: {
        copy,
        open: true,
        model: { name: 'A', email: 'a@b.com', role: '', message: 'Hi' }
      }
    });

    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
