#!/usr/bin/env python3
"""Re-scrape Strateco blog articles with links preserved."""
import json
import re
import time
import requests
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from html import unescape

BLOG_DIR = Path("/home/claude-agent/play/content/blog")
URLS_FILE = Path("/tmp/strateco_urls.json")

def html_to_markdown(element):
    """Convert a BeautifulSoup element to markdown, preserving <a> links."""
    if isinstance(element, NavigableString):
        return str(element)
    
    result = []
    for child in element.children:
        if isinstance(child, NavigableString):
            result.append(str(child))
        elif child.name == 'a':
            href = child.get('href', '')
            text = html_to_markdown(child)
            text = text.strip()
            if href and text:
                result.append(f'[{text}]({href})')
            elif text:
                result.append(text)
        elif child.name == 'strong' or child.name == 'b':
            inner = html_to_markdown(child)
            result.append(f'**{inner}**')
        elif child.name == 'em' or child.name == 'i':
            inner = html_to_markdown(child)
            result.append(f'*{inner}*')
        elif child.name == 'br':
            result.append('\n')
        elif child.name == 'p':
            inner = html_to_markdown(child)
            result.append(f'\n\n{inner.strip()}\n')
        elif child.name == 'ul':
            for li in child.find_all('li', recursive=False):
                inner = html_to_markdown(li)
                result.append(f'- {inner.strip()}\n')
        elif child.name == 'ol':
            for i, li in enumerate(child.find_all('li', recursive=False), 1):
                inner = html_to_markdown(li)
                result.append(f'{i}. {inner.strip()}\n')
        elif child.name == 'h2':
            inner = html_to_markdown(child)
            result.append(f'\n\n## {inner.strip()}\n')
        elif child.name == 'h3':
            inner = html_to_markdown(child)
            result.append(f'\n\n### {inner.strip()}\n')
        elif child.name == 'h4':
            inner = html_to_markdown(child)
            result.append(f'\n\n#### {inner.strip()}\n')
        elif child.name == 'blockquote':
            inner = html_to_markdown(child)
            lines = inner.strip().split('\n')
            result.append('\n\n' + '\n'.join(f'> {line}' for line in lines) + '\n')
        elif child.name == 'code':
            inner = html_to_markdown(child)
            result.append(f'`{inner}`')
        elif child.name == 'pre':
            inner = html_to_markdown(child)
            result.append(f'\n\n```\n{inner}\n```\n')
        else:
            inner = html_to_markdown(child)
            result.append(inner)
    
    return ''.join(result)


def scrape_article(url, slug):
    """Scrape a single article, return markdown body."""
    try:
        resp = requests.get(url, timeout=15, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; BlogSync/1.0)'
        })
        resp.raise_for_status()
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None
    
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    # Find article content - try multiple selectors
    content_el = (
        soup.select_one('.entry-content') or
        soup.select_one('.post-content') or
        soup.select_one('article .content') or
        soup.select_one('article') or
        soup.select_one('.content-area') or
        soup.select_one('.main-content')
    )
    
    if not content_el:
        # Fallback: find largest text block
        print(f"  WARNING: No content container found for {slug}")
        return None
    
    # Remove unwanted elements
    for tag in content_el.find_all(['script', 'style', 'nav', 'footer', 'aside']):
        tag.decompose()
    
    # Remove TAGS sections
    for el in content_el.find_all(['p', 'div', 'span']):
        text = el.get_text(strip=True)
        if re.match(r'^TAGS?:', text, re.IGNORECASE):
            el.decompose()
        elif text.startswith('Kontakt:') and 'strateco.de' in text:
            el.decompose()
        elif text in ('www.wegrowyourbusiness.de', 'https://www.wegrowyourbusiness.de'):
            el.decompose()
    
    # Convert to markdown with links preserved
    md = html_to_markdown(content_el)
    
    # Clean up excessive whitespace
    md = re.sub(r'\n{3,}', '\n\n', md)
    md = md.strip()
    
    return md


def main():
    with open(URLS_FILE) as f:
        urls = json.load(f)
    
    print(f"Scraping {len(urls)} articles with link preservation...")
    
    success = 0
    errors = 0
    skipped = 0
    
    for i, url in enumerate(urls):
        # Extract slug from URL
        slug = url.rstrip('/').split('/')[-1]
        md_file = BLOG_DIR / f"{slug}.md"
        
        if not md_file.exists():
            skipped += 1
            continue
        
        # Read existing frontmatter
        content = md_file.read_text(encoding='utf-8')
        fm_match = re.match(r'^(---\r?\n[\s\S]*?\r?\n---\r?\n)', content)
        if not fm_match:
            print(f"  SKIP {slug}: no frontmatter found")
            skipped += 1
            continue
        
        frontmatter = fm_match.group(1)
        
        print(f"[{i+1}/{len(urls)}] {slug}...", end=' ', flush=True)
        
        body = scrape_article(url, slug)
        if body is None:
            errors += 1
            continue
        
        # Write updated file
        new_content = frontmatter + '\n' + body + '\n'
        md_file.write_text(new_content, encoding='utf-8')
        success += 1
        print(f"OK ({len(body)} chars)")
        
        # Be polite
        time.sleep(0.5)
    
    print(f"\nDone: {success} updated, {errors} errors, {skipped} skipped")


if __name__ == '__main__':
    main()
