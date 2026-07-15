export const supportedLocales = ['de', 'en'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export function normalizeLocale(value: unknown): SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale) ? (value as SupportedLocale) : 'de';
}

export function getPort() {
  const parsed = Number.parseInt(process.env.PORT ?? '3000', 10);
  return Number.isFinite(parsed) ? parsed : 3000;
}

export function getCorsOrigins() {
  const configured = process.env.CORS_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configured?.length
    ? configured
    : [
        'http://localhost:5173',
        'http://resumee.localhost',
        'http://resumee.localhost:81',
        'https://hickmann-kuschnereit.de'
      ];
}
