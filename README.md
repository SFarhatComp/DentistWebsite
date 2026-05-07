# Dr. Bader Dental - Bilingual Portfolio Website

A modern, production-ready dentist portfolio website built with Next.js, featuring bilingual support (English/French), Decap CMS for content management, and full Docker containerization.

## Features

- **Bilingual (EN/FR)**: Complete language support with URL-based routing (`/en/`, `/fr/`)
- **Decap CMS**: Admin panel at `/admin` for content management without code changes
- **Netlify-Native**: Optimized for Netlify hosting with Forms, Identity, and Git Gateway
- **Docker-Containerized**: No local Node.js installation required
- **Modern UI**: Built with TailwindCSS, shadcn/ui, and Framer Motion animations
- **SEO Optimized**: Proper hreflang tags, metadata, and static export

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Animations**: Framer Motion
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Content**: Markdown with gray-matter
- **Hosting**: Netlify (static export)
- **Container**: Docker + Docker Compose

## Quick Start (Docker)

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- No Node.js installation required!

### Development

```bash
# Start development server with hot reload
docker compose -f docker-compose.dev.yml up --build

# Access the site at http://localhost:3000
```

### Production Build

```bash
# Build and run production version
docker compose -f docker-compose.prod.yml up --build

# Access at http://localhost:3000
```

### Stop Containers

```bash
# Stop development
docker compose -f docker-compose.dev.yml down

# Stop production
docker compose -f docker-compose.prod.yml down

# Remove volumes (clean slate)
docker compose -f docker-compose.dev.yml down -v
```

## Project Structure

```
├── content/
│   └── cases/
│       ├── en/          # English case studies
│       └── fr/          # French case studies
├── locales/
│   ├── en/common.json   # English UI translations
│   └── fr/common.json   # French UI translations
├── public/
│   ├── admin/           # Decap CMS configuration
│   └── uploads/         # Media files (managed by CMS)
├── src/
│   ├── app/             # Next.js App Router pages
│   │   └── [lang]/      # Language-scoped routes
│   ├── components/      # React components
│   └── lib/             # Utilities (i18n, content parsing)
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile
└── netlify.toml
```

## Netlify Deployment

### 1. Initial Setup

1. Push this repo to GitHub/GitLab/Bitbucket
2. Create a new site on [Netlify](https://app.netlify.com)
3. Connect your repository
4. Build settings are auto-configured via `netlify.toml`

### 2. Enable Identity & Git Gateway

1. Go to **Site settings > Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**, select "Invite only"
4. Under **Services > Git Gateway**, click **Enable Git Gateway**

### 3. Invite Users

1. Go to **Identity** tab
2. Click **Invite users**
3. Enter the dentist's email address
4. They'll receive an invitation to set up their account

### 4. Access Admin Panel

- Navigate to `https://your-site.netlify.app/admin`
- Log in with Netlify Identity credentials
- Start managing content!

## Content Management

### Managing Cases

The dentist can manage case studies through the admin panel:

1. Go to `/admin`
2. Select **Cases (English)** or **Cases (French / Cas en Français)**
3. Click **New Case** or edit existing ones
4. Fill in the fields and publish

**Important**: For bilingual cases, the `slug` must match between EN and FR versions to enable proper language switching.

### Content Structure

Each case study requires:

- **Title**: Case name
- **Slug**: URL identifier (must match across languages)
- **Date**: Publication date
- **Featured**: Show on homepage
- **Tags**: Categorization
- **Excerpt**: Brief description
- **Cover Image**: Main image
- **Gallery**: Additional images with before/after labels
- **Body**: Full content with sections (Challenge, Approach, Result)

## Language System

### How It Works

- URLs are language-scoped: `/en/cases/smile-makeover`, `/fr/cases/smile-makeover`
- UI translations are stored in `/locales/{lang}/common.json`
- Content is stored separately in `/content/cases/{lang}/`
- Language switcher preserves current page path

### Adding/Modifying Translations

Edit the JSON files in `/locales/`:

```json
// locales/en/common.json
{
  "nav": {
    "home": "Home",
    "cases": "Case Studies",
    ...
  }
}
```

```json
// locales/fr/common.json
{
  "nav": {
    "home": "Accueil",
    "cases": "Études de cas",
    ...
  }
}
```

## SEO

### hreflang Tags

The site automatically generates proper hreflang headers via `netlify.toml` for language alternates.

### Metadata

Each page generates appropriate metadata through Next.js `generateMetadata` functions.

### Static Generation

All pages are statically generated at build time for optimal performance and SEO.

## Forms

### Contact Form

- Uses Netlify Forms with honeypot spam protection
- Supports file attachments (images, PDFs, documents)
- File upload limit: 10MB per file (Netlify free tier)

### Form Notifications

1. Go to **Site settings > Forms > Form notifications**
2. Add email notification for the "contact" form
3. Enter the dentist's email to receive submissions

## Local CMS Development

To test Decap CMS locally without Netlify:

```bash
# In a separate terminal, run the Decap CMS proxy
npx decap-server

# Then start the dev server
docker compose -f docker-compose.dev.yml up
```

This enables the `local_backend: true` setting in the CMS config.

## Customization

### Branding

- Update site name in `locales/*/common.json` under `site.name`
- Replace logo at `public/logo.png`
- Modify color scheme in `src/app/globals.css` (CSS variables)

### Adding Pages

1. Create a new folder in `src/app/[lang]/`
2. Add `page.tsx` with proper metadata
3. Update navigation in `src/components/layout/navbar.tsx`
4. Add translations to locale files

## Troubleshooting

### Build Fails

- Ensure all case study frontmatter is valid YAML
- Check that image paths in content exist
- Verify locale JSON files are valid

### CMS Login Issues

- Confirm Netlify Identity is enabled
- Check Git Gateway is enabled
- Verify user has been invited and accepted

### Images Not Loading

- Ensure images are in `/public/uploads/`
- Path should start with `/uploads/` (not `public/uploads/`)
- Check file extensions match (case-sensitive)

## Known Limitations

- File uploads via forms limited to 10MB (Netlify free tier)
- Editorial workflow requires Pro plan for branch deploys preview
- Image optimization is disabled for static export compatibility

## License

Private project - All rights reserved.

---

Built with Next.js, TailwindCSS, and Decap CMS. Deployed on Netlify.
