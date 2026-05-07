# Netlify-only Dentist Portfolio – Bilingual (EN/FR) & Fully Containerized Prompt

Use this prompt in an **LLM-driven code editor** to generate the full project.

---

## ROLE

You are a **senior front-end engineer** and **DevOps-oriented web architect**.  
Build a **production-ready, modern dentist portfolio website** optimized for **Netlify-only hosting**, with:

1. A public **bilingual website (English + French)**  
2. A **fully autonomous admin panel** where the dentist can manage content **in both languages** without developer help  
3. A **contact form with file uploads** that emails submissions to the dentist  
4. **Complete containerization** so the developer installs **zero dependencies locally**

The project must be **frontend-first**, **Netlify-native**, and **Docker-driven**.

---

## A) NON-NEGOTIABLE CONSTRAINTS

- Hosting: **Netlify only** (free tier)
- Admin: **Decap CMS (Netlify CMS)** at `/admin`
- No custom backend server
- Content stored in repo (Git-backed CMS)
- Contact handled via **Netlify Forms**
- **Fully containerized**:
  - `docker-compose.dev.yml` (hot reload)
  - `docker-compose.prod.yml` (production-like)
  - No local Node/npm installation required

---

## B) TECH STACK

- **Next.js (latest stable, App Router)** + **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Framer Motion**
- Markdown parsing: `gray-matter` + minimal markdown renderer
- Images: `next/image`

---

## C) BILINGUAL STRATEGY (CRITICAL)

### 1) UI TRANSLATIONS (EN / FR)
- All UI text (navigation, buttons, labels, headings) must be translated using **JSON locale files**
- Structure:
  ```
  /locales
    /en/common.json
    /fr/common.json
  ```
- Implement a lightweight translation helper (no heavy i18n library required)
- Language switcher in navbar (EN / FR)
- Default language:
  - Browser language detection
  - Fallback to English
- Language-scoped URLs:
  - `/en/...`
  - `/fr/...`

---

### 2) CASE CONTENT TRANSLATIONS (EN / FR)
- **Do NOT mix languages in one file**
- Use **two separate folders**:
  ```
  content/cases/en/
  content/cases/fr/
  ```
- Each language has its own Markdown files
- Slugs must match between languages
- The site loads cases based on the selected language

This approach prioritizes **clarity, SEO, and CMS simplicity**.

---

## D) ROUTES & PAGES

### Public (language-scoped)
- `/[lang]` – Home
- `/[lang]/cases` – Case index
- `/[lang]/cases/[slug]` – Case detail
- `/[lang]/contact` – Contact form

### Admin
- `/admin` – Decap CMS (language-agnostic)

---

## E) CONTENT MODEL (MARKDOWN)

Location:
```
content/cases/{en|fr}/{slug}.md
```

### Frontmatter
- `title`
- `slug`
- `date`
- `tags`
- `excerpt`
- `featured`
- `coverImage`
- `gallery`:
  - `src`
  - `caption`
  - `type?` (`before | after | normal`)

### Markdown body must include:
```md
## Challenge
## Approach
## Result
```

Provide **3 sample cases per language** (translated placeholders are acceptable).

---

## F) NETLIFY FORMS (CONTACT)

- One form per language, same form name
- Must support **file uploads**
- Must include honeypot spam protection

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  encType="multipart/form-data"
>
```

Fields:
- name
- email
- subject
- message
- attachment (multiple files)

---

## G) DECAP CMS CONFIGURATION

- `/public/admin/index.html`
- `/public/admin/config.yml`
- Backend:
  - `git-gateway`
  - branch: `main`
- Media:
  - `media_folder: public/uploads`
  - `public_folder: /uploads`
- Collections:
  - `cases_en` → `content/cases/en`
  - `cases_fr` → `content/cases/fr`
- CMS UI must clearly label **EN vs FR** collections

---

## H) CONTAINERIZATION (MANDATORY)

### Files
- `Dockerfile` (multi-stage: dev, build, prod)
- `docker-compose.dev.yml`
  - Hot reload
  - Named volume for `node_modules`
  - Source mounted
  - Port 3000
- `docker-compose.prod.yml`
  - Production build
  - No source mounts
  - Port 3000
- `.dockerignore`

### Commands
```bash
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.prod.yml up --build
```

No local Node installation required.

---

## I) NETLIFY DEPLOYMENT

- Netlify build command: `npm run build`
- Enable:
  - Netlify Identity
  - Git Gateway
- Dentist logs in at `/admin`
- Configure email notifications for form submissions

---

## J) README REQUIREMENTS

Include:
- Docker-only workflow
- Dev vs prod compose usage
- Netlify deploy steps
- Identity + Git Gateway setup
- How dentist edits EN vs FR cases
- How language switch works
- SEO + `hreflang` notes
- Known limitations

---

## K) DESIGN DIRECTION

- Premium medical aesthetic
- Clean, modern, minimal
- Soft shadows, subtle gradients
- Elegant Framer Motion animations
- Fully responsive & accessible

---

## FINAL INSTRUCTION

Generate the **complete, Netlify-ready, fully containerized, bilingual (EN/FR) project** now.
