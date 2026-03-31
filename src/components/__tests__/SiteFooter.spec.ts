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
  it('renders the app version as a release link in the footer', () => {
    const wrapper = mount(SiteFooter, {
      props: { copy },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const releaseLink = wrapper.find(
      `a[href="https://github.com/andrehickmann/resumee/releases/tag/v${__APP_VERSION__}"]`
    );
    expect(releaseLink.exists()).toBe(true);
    expect(releaseLink.text()).toBe(`Version ${__APP_VERSION__}`);
  });
});
