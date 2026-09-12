<template>
  <div class="term">
    <div class="term-atmosphere"></div>

    <header class="term-head">
      <div class="term-titlebar">
        <span class="term-dots"><i></i><i></i><i></i></span>
        <span class="term-path">andre@berlin: ~/portfolio/legal.md</span>
        <RouterLink class="term-kbd" to="/">$ cd ~/portfolio</RouterLink>
      </div>
      <nav class="term-tabs">
        <a
          v-for="file in files"
          :key="file.id"
          class="term-tab"
          :class="{ 'is-active': file.id === active }"
          :href="`#${file.id}`"
          @click.prevent="goTo(file.id)"
        >
          <span class="term-tab-icon">#</span>{{ file.file }}
        </a>
      </nav>
    </header>

    <div class="term-body is-single">
      <main id="main" class="term-main">
        <section id="impressum" class="term-section">
          <div class="term-crumb">
            <span><span class="path">~/portfolio</span> / impressum.md</span>
          </div>
          <h1 class="term-h2">Impressum</h1>

          <div class="legal-prose">
            <p>Angaben gemäß § 5 DDG</p>
            <p>
              André Frank Hickmann Kuschnereit<br />
              Budapester Str. 23<br />
              16548 Glienicke/Nordbahn<br />
              Deutschland<br />
              E-Mail:
              <a href="mailto:andre@hickmann-kuschnereit.de">andre@hickmann-kuschnereit.de</a>
            </p>
          </div>
        </section>

        <section id="datenschutz" class="term-section">
          <div class="term-crumb">
            <span><span class="path">~/portfolio</span> / datenschutz.md</span>
          </div>
          <h2 class="term-h2">Datenschutz</h2>

          <div class="legal-prose">
            <h3><span class="marker">##</span> 1. Verantwortliche Stelle</h3>
            <p>
              André Frank Hickmann Kuschnereit<br />
              Budapester Str. 23<br />
              16548 Glienicke/Nordbahn<br />
              Deutschland<br />
              E-Mail:
              <a href="mailto:andre@hickmann-kuschnereit.de">andre@hickmann-kuschnereit.de</a>
            </p>

            <h3><span class="marker">##</span> 2. Datenverarbeitung</h3>
            <p>
              Diese Website verarbeitet keine personenbezogenen Daten zu Analyse- oder
              Marketingzwecken. Es wird kein Tracking und kein Analytics eingesetzt, und es werden
              keine Cookies gesetzt.
            </p>

            <h3><span class="marker">##</span> 3. Kontaktaufnahme</h3>
            <p>
              Bei Kontaktaufnahme per E-Mail werden die von Ihnen übermittelten Daten (Name,
              E-Mail-Adresse, Nachricht) ausschließlich zur Beantwortung Ihrer Anfrage verwendet und
              anschließend gelöscht.
            </p>

            <h3><span class="marker">##</span> 4. Kontaktformular</h3>
            <p>
              Das Kontaktformular auf dieser Website wird über den Dienst Web3Forms versandt. Die
              von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, optional Rolle/Unternehmen,
              Nachricht) werden dazu an Web3Forms übertragen und von dort per E-Mail an die
              verantwortliche Stelle weitergeleitet.
            </p>
            <p>
              <strong>Anbieter:</strong> Web3Forms,
              <a href="https://web3forms.com/privacy" target="_blank" rel="noopener">
                https://web3forms.com/privacy
              </a>
            </p>
            <p>
              Zum Schutz vor automatisierten Einsendungen wird hCaptcha eingesetzt. Dabei werden
              Ihre IP-Adresse sowie Interaktionsdaten an den Anbieter übermittelt.
            </p>
            <p>
              <strong>Anbieter:</strong> Intuition Machines, Inc., 350 Alabama St, San Francisco, CA
              94110, USA,
              <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener">
                https://www.hcaptcha.com/privacy
              </a>
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO — das berechtigte Interesse an der
              Bearbeitung Ihrer Anfrage und an der Abwehr von Spam. Die Nutzung des Formulars ist
              freiwillig; alternativ erreichen Sie mich unmittelbar per E-Mail.
            </p>

            <h3><span class="marker">##</span> 5. Hosting und Auslieferung</h3>
            <p>
              Diese Website wird auf einem eigenen Server (vServer) betrieben. Der Server wird
              bereitgestellt von:
            </p>
            <p>
              <strong>Anbieter:</strong> manitu GmbH, Welvertstraße 2, 66606 St. Wendel, Deutschland
            </p>
            <p>
              <strong>Datenschutzerklärung:</strong>
              <a href="https://www.manitu.de/datenschutz/" target="_blank" rel="noopener">
                https://www.manitu.de/datenschutz/
              </a>
            </p>
            <p>
              Dem Server vorgeschaltet ist Cloudflare als DNS-Anbieter sowie als Content Delivery
              Network und Proxy; Anfragen an diese Website erreichen daher zunächst Cloudflare.
            </p>
            <p>
              <strong>Anbieter:</strong> Cloudflare, Inc., 101 Townsend St., San Francisco, CA
              94107, USA
            </p>
            <p>
              <strong>Datenschutzerklärung:</strong>
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">
                https://www.cloudflare.com/privacypolicy/
              </a>
            </p>
            <p>
              Cloudflare kann technisch notwendige Cookies zur Lastverteilung und Angriffsabwehr
              einsetzen (etwa <code>__cflb</code>, <code>__cfruid</code>). Diese sind für den
              Betrieb der Website erforderlich und bedürfen nach Art. 6 Abs. 1 lit. f DSGVO keiner
              Einwilligung.
            </p>

            <h3><span class="marker">##</span> 6. Server-Log-Dateien</h3>
            <p>
              Der Webserver dieser Website führt <strong>kein Zugriffsprotokoll</strong>. Es werden
              dort also weder IP-Adressen noch aufgerufene Adressen gespeichert. Protokolliert
              werden ausschließlich technische Fehler.
            </p>
            <p>
              Unabhängig davon verarbeitet der vorgeschaltete Anbieter Cloudflare Verbindungsdaten,
              um die Website auszuliefern und vor Angriffen zu schützen. Näheres regelt dessen
              Datenschutzerklärung.
            </p>

            <h3><span class="marker">##</span> 7. Externe Inhalte</h3>
            <p>
              Diese Website verwendet Google Fonts zur einheitlichen Darstellung von Schriftarten.
              Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriften; dabei wird Ihre
              IP-Adresse an Google übermittelt.
            </p>
            <p>
              <strong>Anbieter:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin
              4, Irland
            </p>
            <p>
              <strong>Datenschutzerklärung:</strong>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                https://policies.google.com/privacy
              </a>
            </p>

            <h3><span class="marker">##</span> 8. Ihre Rechte</h3>
            <p>Sie haben das Recht auf:</p>
            <ul>
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>

            <h3><span class="marker">##</span> 9. SSL-Verschlüsselung</h3>
            <p>
              Diese Website nutzt zum Schutz der Übertragung eine SSL-/TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
              „https://“ zeigt und ein Schloss-Symbol erscheint.
            </p>
          </div>
        </section>
      </main>
    </div>

    <StatusBar :rd="rd" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { scrollToSection, useScrollSpy } from '../composables/useScrollSpy';
import StatusBar from '../components/terminal/StatusBar.vue';

import '../terminal.css';

const BASE_URL = 'https://hickmann-kuschnereit.de';

const files = [
  { id: 'impressum', file: 'impressum.md' },
  { id: 'datenschutz', file: 'datenschutz.md' }
];

const { tm } = useI18n({ useScope: 'global' });

const rd = computed(() => (tm('app') as Record<string, any>).rd);

const { active } = useScrollSpy(
  files.map((file) => file.id),
  { bottom: 'datenschutz' }
);

function goTo(id: string) {
  scrollToSection(id);
}

useHead({
  htmlAttrs: { lang: 'de' },
  title: 'Impressum & Datenschutz | André Hickmann Kuschnereit',
  link: [{ rel: 'canonical', href: `${BASE_URL}/legal` }],
  meta: [
    {
      name: 'description',
      content: 'Impressum und Datenschutzhinweise von André Hickmann Kuschnereit.'
    },
    { property: 'og:url', content: `${BASE_URL}/legal` },
    { property: 'twitter:url', content: `${BASE_URL}/legal` }
  ]
});
</script>
