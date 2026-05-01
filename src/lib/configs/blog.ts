/**
 * Blog post loader. Posts are stored as Markdown files with YAML
 * frontmatter under /content/blog/. Decap CMS reads and writes the same
 * directory at /admin/, so editorial changes flow back through Git.
 *
 * The loader uses Vite's `import.meta.glob` to inline all post files at
 * build time — no filesystem reads at runtime, no SSR-only constraints.
 */

const files = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  /** ISO yyyy-mm-dd for sorting */
  isoDate: string;
  title: string;
  teaser: string;
  image: string;
  /** Approximate read time in minutes */
  readMinutes: number;
  /** Author byline */
  author: string;
  /** Raw Markdown body — render with markdown-it */
  body: string;
}

export const BLOG_CATEGORIES = [
  'Allgemein',
  'Usability',
  'E-Mail Marketing',
  'CX Analytics',
  'B2B',
  'Meinungen',
  'Lead Management',
  'Marketing Automation',
  'News',
  'Intern',
  'Projekte',
  'Beratung',
  'Big Data',
  'Online Marketing',
  'Contact Center',
  'Change',
  'Begeisterung',
  'Account Management',
  'Akquise',
  'Analyse',
  'Bestandskunde',
  'CRM',
  'Event Marketing',
  'Digitaler Wandel',
  'Social Media',
  'Compliance',
  'AML',
  'Strategie',
  'Data Management',
  'Customer Relationship',
  'Erfolg',
  'Customer',
  'Leadgenerierung',
  'Marketing Outsourcing',
  'Marketing Automation Systeme',
  'Webinare',
  'digital'
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Tiny YAML frontmatter parser. Handles the simple `key: value` shape
 * we use in our blog files (string + number values, optional quotes).
 * Avoids pulling in a full YAML dependency for this single use-case.
 */
function parseFrontmatter(raw: string): { data: Record<string, string | number>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string | number> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Coerce to number if it looks like a clean integer/float
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[m[1]] = Number(value);
    } else {
      data[m[1]] = value;
    }
  }
  return { data, body: match[2].trim() };
}

function fromFile(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  const slugFromPath = path.split('/').pop()!.replace(/\.md$/, '');
  return {
    slug: String(data.slug ?? slugFromPath),
    title: String(data.title ?? '(ohne Titel)'),
    category: String(data.category ?? 'Allgemein'),
    date: String(data.date ?? ''),
    isoDate: String(data.isoDate ?? ''),
    image: String(data.image ?? ''),
    author: String(data.author ?? 'STRATECO Editorial'),
    readMinutes: Number(data.readMinutes ?? 5),
    teaser: String(data.teaser ?? ''),
    body
  };
}

export const blogPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => fromFile(path, raw))
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
