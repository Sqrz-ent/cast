import { supportedLocaleCodes } from '$lib/i18n';

export function match(param: string) {
	return supportedLocaleCodes.includes(param);
}
