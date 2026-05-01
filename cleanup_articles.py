#!/usr/bin/env python3
"""Clean up blog articles: remove TAGS, Kontakt, wegrowyourbusiness lines."""
import re
from pathlib import Path

BLOG_DIR = Path("/home/claude-agent/play/content/blog")

removed_tags = 0
removed_kontakt = 0
removed_wegrow = 0
files_changed = 0

for md_file in sorted(BLOG_DIR.glob("*.md")):
    original = md_file.read_text(encoding="utf-8")
    lines = original.split("\n")
    
    # Find the end of frontmatter
    in_frontmatter = False
    fm_end = 0
    for i, line in enumerate(lines):
        if line.strip() == "---":
            if not in_frontmatter:
                in_frontmatter = True
            else:
                fm_end = i + 1
                break
    
    # Work on body lines only
    body_lines = lines[fm_end:]
    new_body = []
    changed = False
    
    for line in body_lines:
        stripped = line.strip()
        
        # Remove TAGS: lines
        if re.match(r'^TAGS?:', stripped, re.IGNORECASE):
            removed_tags += 1
            changed = True
            continue
        
        # Remove Kontakt lines (with email/phone)
        if re.match(r'^Kontakt:', stripped, re.IGNORECASE):
            removed_kontakt += 1
            changed = True
            continue
        
        # Remove standalone wegrowyourbusiness.de
        if stripped == 'www.wegrowyourbusiness.de' or stripped == 'https://www.wegrowyourbusiness.de':
            removed_wegrow += 1
            changed = True
            continue
        
        new_body.append(line)
    
    if changed:
        # Clean up trailing blank lines
        while new_body and new_body[-1].strip() == '':
            new_body.pop()
        new_body.append('')  # single trailing newline
        
        new_content = "\n".join(lines[:fm_end]) + "\n".join(new_body)
        md_file.write_text(new_content, encoding="utf-8")
        files_changed += 1

print(f"Files changed: {files_changed}")
print(f"TAGS lines removed: {removed_tags}")
print(f"Kontakt lines removed: {removed_kontakt}")
print(f"wegrowyourbusiness lines removed: {removed_wegrow}")
