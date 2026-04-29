/**
 * Canonical (de-localized) routes for navigation.
 * Labels come from Paraglide messages at render time — these keys stay stable
 * across locales. Use `localizeHref(item.href)` when rendering.
 */
export const navMain = [
  { href: '/about-us', key: 'menu_aboutUs' },
  { href: '/expertise', key: 'menu_expertise' },
  { href: '/insights', key: 'menu_insights' }
] as const;

export const navLegal = [
  { href: '/imprint', key: 'footer_legal_imprint' },
  { href: '/privacy', key: 'footer_legal_privacy' }
] as const;
