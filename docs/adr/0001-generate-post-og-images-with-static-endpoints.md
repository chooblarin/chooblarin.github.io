# Generate Post OG Images With Static Endpoints

## Status

Accepted

## Context

Post pages need stable metadata for OGP, RSS, JSON-LD, and SEO. Authors may provide a Post Description and Post Image in frontmatter, but existing content does not consistently include them.

Astro already builds this site as static output. Astro file endpoints can return binary responses during static builds, so post-specific OG images can be generated without adding runtime infrastructure.

## Decision

- Keep `description` optional in content frontmatter.
- Resolve the Post Summary from an explicit Post Description when present and non-empty.
- Generate a fallback summary from the post body when no Post Description exists.
- Prefer an explicit Post Image when present.
- Generate a 1200x630 PNG at `/og/{post.id}.png` when no Post Image exists.
- Generate OG images with an Astro static endpoint using Satori and Resvg.
- Include the post title and `By sotahatakeyama (@chooblarin)` in the Generated OG Image.

## Consequences

- Existing posts get specific RSS, JSON-LD, and OGP metadata without frontmatter churn.
- Generated images are derived at build time and are not committed as source assets.
- Authors can still override the social preview image per post with frontmatter.
- Build time increases because every post without a Post Image renders a PNG.
