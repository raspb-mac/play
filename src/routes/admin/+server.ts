import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * /admin (without trailing slash) → /admin/index.html
 *
 * In production Netlify rewrites this via netlify.toml; in `vite dev` we
 * handle it here so opening /admin in the browser actually loads the
 * static Decap CMS bundle from /static/admin/index.html.
 */
export const GET: RequestHandler = () => {
  throw redirect(307, '/admin/index.html');
};
