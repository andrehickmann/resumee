import { mount, RouterLinkStub } from '@vue/test-utils';
import SiteFooter from '../SiteFooter.vue';

const copy = {
  footer: 'Footer copy',
  footerNote: 'Built with care',
  footerVersionLabel: 'Version',
  footerImprint: 'Imprint',
  footerPrivacy: 'Privacy',
  footerReportBug: 'Report bug',
  footerGitHub: 'GitHub'
};

describe('SiteFooter', () => {
  it('renders the app version in the footer', () => {
    const wrapper = mount(SiteFooter, {
      props: { copy },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.find('.footer-version').text()).toContain(`Version ${__APP_VERSION__}`);
  });
});
