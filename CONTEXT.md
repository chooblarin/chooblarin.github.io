# Blog System

This context defines the language for publishing and presenting blog posts.

## Language

**Post Description**:
An author-written summary in a post's frontmatter. It is the preferred source for a post's summary when present and non-empty; an empty string is not a usable Post Description.
_Avoid_: description when referring to the final resolved summary

**Generated Description**:
A fallback summary derived from the raw post body when no usable Post Description exists. It is concise enough for metadata surfaces and is capped at 160 characters.
_Avoid_: excerpt, auto description

**Post Summary**:
The final summary used for article metadata surfaces such as OGP, RSS, JSON-LD, and search snippets. It is either the Post Description or the Generated Description.
_Avoid_: description, excerpt

**Post Image**:
An author-selected image in a post's frontmatter. It is the preferred OGP image when present and may be either a site-local path or an external URL.
_Avoid_: image when referring to the final resolved OGP image

**Generated OG Image**:
A 1200x630 PNG fallback OGP image generated for a post only when no Post Image exists. It contains the post title and the author line "By sotahatakeyama (@chooblarin)".
_Avoid_: default image, auto image

**OG Image**:
The final image used for social preview metadata. It is either the Post Image or the Generated OG Image.
_Avoid_: image

**Site OG Image**:
The fallback OGP image for non-post pages.
_Avoid_: default image when discussing post-specific social previews

## Example Dialogue

Developer: "This post has no Post Description. Should the RSS item use the site description?"

Domain expert: "No. Use a Generated Description so the Post Summary remains specific to the post."

Developer: "This post has no Post Image. Should it use the site default OGP image?"

Domain expert: "No. Use a Generated OG Image so the OG Image remains specific to the post."
