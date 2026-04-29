import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { localizeUrl, extractLocaleFromRequest } from '$lib/paraglide/runtime';

const handleLocaleRedirect: Handle = ({ event, resolve }) => {
  if (event.request.headers.get('Sec-Fetch-Dest') === 'empty') return resolve(event);
  const { pathname } = event.url;
  if (pathname.startsWith('/api/') || /\.\w+$/.test(pathname)) return resolve(event);

  const locale = extractLocaleFromRequest(event.request);
  const localized = localizeUrl(event.url, { locale });

  if (!building && localized.pathname !== event.url.pathname) {
    return new Response(null, {
      status: 307,
      headers: { Location: localized.pathname + event.url.search + event.url.hash }
    });
  }
  return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', locale)
    });
  });

export const handle: Handle = sequence(handleLocaleRedirect, handleParaglide);
