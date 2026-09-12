import { mount } from '@vue/test-utils';
import ContactSection from '../ContactSection.vue';

const rd = {
  contactTitle: 'Lass uns reden',
  contactIntro: 'Intro',
  contactCommand: '$ ./contact.sh \\',
  contactButton: 'Nachricht senden',
  contactMailLabel: 'mail',
  contactWhereLabel: 'where',
  contactLinksLabel: 'links',
  contactWhere: 'Berlin · Remote',
  formName: 'Dein Name',
  formEmail: 'Deine E-Mail',
  formRole: 'Rolle / Unternehmen',
  formMessage: 'Worum geht es?',
  formCaptchaLabel: '--verify',
  sentText: 'Danke – ich melde mich persönlich.'
};

function factory(overrides = {}) {
  return mount(ContactSection, {
    props: {
      rd,
      model: { name: '', email: '', role: '', message: '', honeypot: '' },
      submitting: false,
      error: '',
      sent: false,
      ...overrides
    }
  });
}

describe('ContactSection', () => {
  it('labels the fields like shell flags', () => {
    const flags = factory()
      .findAll('.contact-field .flag')
      .map((flag) => flag.text());
    expect(flags).toEqual(['--name', '--email', '--role', '--message', '--verify']);
  });

  it('emits submit instead of reloading the page', async () => {
    const wrapper = factory();
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('disables the fields while the request is in flight', () => {
    const wrapper = factory({ submitting: true });
    expect(wrapper.find('.contact-submit').attributes('disabled')).toBeDefined();
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('shows the error text returned by the backend', () => {
    expect(factory({ error: 'Bitte bestätige das Captcha.' }).find('.contact-error').text()).toBe(
      'Bitte bestätige das Captcha.'
    );
  });

  it('replaces the form with the exit-0 panel once sent', () => {
    const wrapper = factory({ sent: true });
    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.find('.contact-sent').text()).toContain('Danke');
  });

  it('carries the captcha widget so web3forms accepts the submission', () => {
    expect(factory().find('.h-captcha').attributes('data-sitekey')).toBeTruthy();
  });
});
