# Product Requirements Document (PRD)

Project: elyesghazel.ch – Portfolio & Services Website

Version: 1.0

Author: Elyes Ghazel

## 1. Overview

This project is a modern, personal portfolio website designed to present Elyes Ghazel’s professional profile, technical skills,
and services in web development, UI/UX design, CAD, 3D printing, and custom projects.
The site also includes a quote form for potential clients to request estimates.

Built with Vite and React, styled using TailwindCSS and SCSS for performance, modularity, and flexibility.

## 2. Goals

- Present a professional, clean, and visually appealing online identity.
- Offer clear navigation to services, projects, and contact options.
- Enable potential clients to easily request project quotes.
- Showcase technical range: from software (web/UI) to hardware (CAD/3D printing).
- Ensure fast load times and smooth interactions across all devices.

## 3. Technical Stack

- **Frontend Framework**: React (with Vite build tool)
- **Styling**: TailwindCSS for layout and utility classes; SCSS for component-specific or reusable styling logic.
- **Routing**: React Router v6
- **Animations**: Framer Motion (for subtle transitions and scroll reveals)
- **Form Handling**: React Hook Form or custom validation
- **State Management**: Local state (no Redux needed)
- **Hosting**: Own server
- **Assets**: Optimized images, SVG icons (Lucide / custom set)

## 4. Site Structure

| Page     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| Home     | Hero section with CTA and quick stats; intro to services; links to projects. |
| Services | Cards for each main service with icons, titles, subpoints, and CTA buttons.  |
| Projects | Project blocks with tags, titles, descriptions, and optional buttons.        |
| Quote    | Dynamic quote form (project type, description, budget, file upload, etc.).   |
| Contact  | Simple contact info and email section.                                       |
| Footer   | Basic copyright + quick navigation.                                          |

## 5. Page Requirements

### 5.1 Home Page

- Hero section with main headline and CTA (Contact Me or Get Started).
- Stats component (e.g. 7+ Years Experience, 20+ Projects, 1000+ Hours).
- Brief services preview (3–4 cards).
- Scroll animation or parallax hero background.

### 5.2 Services Page

- Grid layout of cards with icons, titles, subpoints, and buttons.
- Cards hover animated (scale, shadow, etc.).
- Each card includes:
  - Title (e.g., “Web Development”)
  - Short description
  - Two bullet points
  - Icon (Lucide set)
  - CTA (“Learn More” or “Start Project”)

### 5.3 Projects Page

- List or grid of large “project blocks”.
- Each includes:
  - Tags (pill badges like “React”, “CAD”, “3D Printing”)
  - Title
  - Description (short paragraph + optional bullet list)
  - Optional button (View Project)
  - Alternating image/text alignment for variety.
  - Responsive layout that collapses gracefully on mobile.

### 5.4 Quote Page

- Single-page form
- **Fields:** Name, Email, Project Type, Project Title, Description, Budget, Timeline, File Upload
- **Dynamic text** based on Project Type (e.g., price hints)
- **Submit button:** “Get My Quote”
- **Validation:** required fields, email format, etc.
- **Submit feedback:** success / failure message

---

### 5.5 Contact Page

- Clean section with email link and message
- Optionally include a contact form

---

### 6. Design & UX Requirements

- Fully responsive (mobile-first)
- Dark/light theme optional (if supported by design)
- Consistent typography and spacing
- Smooth animations for section transitions, hover, and scroll reveals
- Accessibility: labeled form fields, alt text for images, focus states for buttons

---

### 7. Performance & SEO

- Image optimization (next-gen formats like `.webp`)
- Lazy loading for heavy assets
- Semantic HTML for SEO (`h1`, `h2`, meta tags, structured data)
- Title and meta description per page via **React Helmet**
- **Lighthouse score target:** 90+ across Performance, Accessibility, and SEO

---

### 8. Deliverables

- Fully coded frontend project in **React/Vite**
- Responsive implementation of the **Figma design**
- Deployed live site on production hosting (e.g., **Vercel**)
- Source code in Git repository with clear folder structure:

```css
src/
 ├── assets/
 ├── components/
 ├── pages/
 ├── styles/
 ├── hooks/
 ├── data/
 ├── App.jsx
 └── main.jsx

```

---

## 9. Future Enhancements

- Admin dashboard or CMS integration for adding new projects
- Dark/light theme switch
- ReCAPTCHA and mail backend for contact/quote form
- Analytics (e.g., Plausible, Umami)
