<template>
  <main class="legal-page">
    <div class="legal-container">
      <router-link class="back-link" to="/">← Zurück zur Startseite</router-link>

      <section id="impressum" class="section">
        <h2>Impressum</h2>
        <div class="legal-content">
          <p>Angaben gemäß § 5 TMG</p>
          <p>André Frank Hickmann Kuschnereit</p>
          <p>Budapester Str. 23</p>
          <p>16548 Glienicke/Nordbahn</p>
          <p>Deutschland</p>
          <p>E-Mail: andre@hickmann-kuschnereit.de</p>
        </div>
      </section>

      <section id="datenschutz" class="section">
        <h2>Datenschutz</h2>
        <div class="legal-content">
          <h3>1. Verantwortliche Stelle</h3>
          <p>
            André Frank Hickmann Kuschnereit<br />
            Budapester Str. 23<br />
            16548 Glienicke/Nordbahn<br />
            Deutschland<br />
            E-Mail: andre@hickmann-kuschnereit.de
          </p>

          <h3>2. Datenverarbeitung</h3>
          <p>
            Diese Website verarbeitet keine personenbezogenen Daten zu Analyse- oder
            Marketingzwecken. Es wird kein Tracking oder Analytics eingesetzt.
          </p>

          <h3>3. Kontaktaufnahme</h3>
          <p>
            Bei Kontaktaufnahme per E-Mail werden die von Ihnen übermittelten Daten (Name,
            E-Mail-Adresse, Nachricht) ausschließlich zur Beantwortung Ihrer Anfrage verwendet und
            anschließend gelöscht.
          </p>

          <h3>4. Hosting & Content Delivery</h3>
          <p>
            Diese Website wird auf Cloudflare Pages gehostet. Cloudflare ist ein Content Delivery
            Network (CDN), das die Website global verfügbar macht.
          </p>
          <p>
            <strong>Anbieter:</strong> Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107,
            USA
          </p>
          <p>
            <strong>Datenschutzerklärung:</strong>
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">
              https://www.cloudflare.com/privacypolicy/
            </a>
          </p>
          <p>
            Cloudflare setzt technisch notwendige Cookies ein (z.B. __cflb, __cfruid) zur
            Lastverteilung und Bereitstellung der Website. Diese Cookies sind für den Betrieb der
            Website erforderlich und bedürfen nach Art. 6 Abs. 1 lit. f DSGVO keiner Einwilligung.
          </p>

          <h3>5. Server-Log-Dateien</h3>
          <p>
            Der Hosting-Provider erhebt und speichert automatisch Informationen in
            Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
          </p>
          <ul>
            <li>IP-Adresse (anonymisiert)</li>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL (zuvor besuchte Seite)</li>
            <li>Datum und Uhrzeit der Anfrage</li>
          </ul>
          <p>
            Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen
            Datenquellen zusammengeführt. Die Daten werden nach spätestens 7 Tagen gelöscht.
          </p>

          <h3>6. Externe Inhalte</h3>
          <p>
            Diese Website verwendet Google Fonts zur einheitlichen Darstellung von Schriftarten.
            Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts. Dabei wird Ihre
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

          <h3>7. Ihre Rechte</h3>
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

          <h3>8. SSL-Verschlüsselung</h3>
          <p>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte eine SSL-Verschlüsselung (HTTPS). Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an
            dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({
  htmlAttrs: {
    lang: 'de'
  },
  title: 'Impressum & Datenschutz | André Hickmann Kuschnereit',
  link: [{ rel: 'canonical', href: 'https://hickmann-kuschnereit.de/legal' }],
  meta: [
    {
      name: 'description',
      content: 'Impressum und Datenschutzhinweise von André Hickmann Kuschnereit.'
    },
    {
      property: 'og:url',
      content: 'https://hickmann-kuschnereit.de/legal'
    },
    {
      property: 'twitter:url',
      content: 'https://hickmann-kuschnereit.de/legal'
    }
  ]
});
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f4f0 0%, #f2ede3 45%, #efe7d8 100%);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  color: #1f1f1f;
  padding: 2rem 5vw 4rem;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #5c5a54;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #1f1f1f;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f1f1f;
  letter-spacing: -0.02em;
}

.legal-content {
  line-height: 1.7;
}

.legal-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #1f1f1f;
}

.legal-content p {
  margin-bottom: 1rem;
  color: #3d3d3d;
}

.legal-content ul {
  margin: 1rem 0 1.5rem 0;
  padding-left: 1.5rem;
}

.legal-content li {
  margin-bottom: 0.5rem;
  color: #3d3d3d;
  padding-left: 0.5rem;
}

.legal-content a {
  color: #ff6b3d;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.legal-content a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.legal-content strong {
  font-weight: 600;
  color: #1f1f1f;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 1.5rem 4vw 3rem;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .legal-content h3 {
    font-size: 1.1rem;
  }
}
</style>
