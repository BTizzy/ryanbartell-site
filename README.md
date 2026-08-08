# Ryan Bartell — Personal Site

Partner and operator at Trillium Hiring and Trilly Corp. Live at https://btizzy.github.io/ryanbartell-site/.

## What's here

The site is a single-page portfolio with a dark operator aesthetic. It is built with hand-rolled HTML, CSS, and JS. Sections: hero, about, services, companies, case studies, build log, bug bounty, contact. No build step, no framework, no analytics, no tracking.

## Local development

```bash
# Clone
git clone https://github.com/BTizzy/ryanbartell-site.git
cd ryanbartell-site

# Serve locally (any static server works)
python3 -m http.server 8765
# then open http://localhost:8765/
```

## Deploy

Push to main → GitHub Pages auto-deploys within ~30s. Check status at `gh api repos/BTizzy/ryanbartell-site/pages`.

## File structure

```
ryanbartell-site/
├── index.html        # single page, all sections
├── styles.css        # dark operator aesthetic
├── script.js         # mobile menu, smooth scroll, intersection observer
├── assets/           # hero bg, icons
└── README.md         # you are here
```

## Custom domain (when ready)

Add a `CNAME` file at repo root with the domain (e.g. `ryanbartell.com`). Configure DNS:
- Apex domain (`ryanbartell.com`): A records to GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153)
- Subdomain (`www.ryanbartell.com`): CNAME to `btizzy.github.io`

Then enable HTTPS enforcement in repo Settings → Pages.

## Editing conventions

- One PR per concern (content, copy, design, deploy)
- Keep it vanilla — no React, no build step, no Tailwind
- Match the existing dark operator aesthetic — no playful colors, no rounded blobs
- Voice is direct, anti-bloat. No "passionate about", no "in today's fast-paced world"
- Max 1 em-dash per paragraph

## License

Personal site — no license. Don't reproduce without permission.
