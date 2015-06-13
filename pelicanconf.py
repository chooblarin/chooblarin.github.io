#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

THEME = 'theme/crowsfoot'

AUTHOR = u'chooblarin'
SITENAME = u'chooblarin\'s blog'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Asia/Tokyo'

DATE_FORMATS = {
    'en': '%a, %d %b %Y',
    'jp': '%Y-%m-%d(%a)',
}

LOCALE = (
    'usa', 'jpn',  # On Windows
    'en_US', 'ja_JP'     # On Unix/Linux
    )

DEFAULT_LANG = u'ja'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

STATIC_PATHS = [
    'CNAME',
    'images'
    ]

# Others config

EMAIL_ADDRESSS = 'choo.bla.rin@gmail.com'
GITHUB_ADDRESS = 'https://github.com/chooblarin'
TWITTER_ADDRESS = 'https://twitter.com/chooblarin'
FB_ADDRESS = 'https://www.facebook.com/sou.hatake'

PROFILE_IMAGE_URL = 'images/kao.png'
SHOW_ARTICLE_AUTHOR = False
