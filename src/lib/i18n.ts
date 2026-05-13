export const defaultLocale = 'en';
export const supportedLocaleCodes = ['es', 'de'] as const;
export const allLocaleCodes = [defaultLocale, ...supportedLocaleCodes] as const;

export type Locale = (typeof allLocaleCodes)[number];

export const locales: Record<Locale, { label: string; shortLabel: string; pathPrefix: string }> = {
	en: { label: 'English', shortLabel: 'EN', pathPrefix: '' },
	es: { label: 'Español', shortLabel: 'ES', pathPrefix: '/es' },
	de: { label: 'Deutsch', shortLabel: 'DE', pathPrefix: '/de' }
};

export function normalizeLocale(locale: string | undefined | null): Locale {
	return allLocaleCodes.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): Locale {
	const firstSegment = pathname.split('/').filter(Boolean)[0];
	return normalizeLocale(firstSegment);
}

export function stripLocalePrefix(pathname: string) {
	const segments = pathname.split('/').filter(Boolean);
	if (supportedLocaleCodes.includes(segments[0] as (typeof supportedLocaleCodes)[number])) {
		segments.shift();
	}
	return `/${segments.join('/')}`.replace(/\/$/, '') || '/';
}

export function localizePath(pathname: string, locale: Locale) {
	const barePath = stripLocalePrefix(pathname);
	const prefix = locales[locale].pathPrefix;
	return `${prefix}${barePath === '/' ? '' : barePath}` || '/';
}
