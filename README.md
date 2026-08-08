# Ryan Bartell — Personal Site

Partner and operator at Trillium Hiring and Trilly Corp (Amy owns both; Rachel leads brand). Live at https://btizzy.github.io/ryanbartell-site/.

Single-page portfolio. Dark operator aesthetic. Vanilla HTML/CSS/JS. No framework, no build step, no analytics, no tracking.

## Local Development

```bash
git clone https://github.com/BTizzy/ryanbartell-site.git
cd ryanbartell-site
python3 -m http.server 8765
```

Open http://localhost:8765.

## Deploy

Push to `main` → GitHub Pages deploys automatically (~30s). Check status with:

```bash
gh api repos/BTizzy/ryanbartell-site/pages
```

Custom domain (when ready): add `CNAME` file with the domain, update DNS (A records for apex, CNAME for www), enable HTTPS in repo settings.

## Structure

- `index.html` — all sections (hero, about, services, companies, build log, bug bounty, connect)
- `styles.css` — dark technical aesthetic with micro-interactions
- `script.js` — mobile menu (slide-in, ESC, focus trap, ARIA), smooth scroll, intersection observer reveals
- `assets/` — hero background, custom SVGs, icons

## Editing Rules

- One concern per PR
- Match existing voice: direct, specific numbers, anti-bloat, max 1 em-dash per paragraph
- Keep it vanilla
- Source all claims (especially bug bounty work)

## License

Personal site. Don't copy without permission.

Last updated: 2026-08-08

Last deployed: Sat Aug  8 12:52:36 EDT 2026
