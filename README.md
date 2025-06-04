# Teri Eyenike Portfolio

A modern, world-class developer portfolio built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and Markdown.  
Showcasing projects, blog posts, and more — with a focus on accessibility, performance, and developer experience.

---

## ✨ Features

- **Astro** for fast, static site generation
- **Tailwind CSS** for utility-first, responsive styling
- **Markdown** for easy blog and content authoring
- **Dark mode** with smooth transitions
- **Responsive design** for all devices
- **SEO optimized** with meta tags and Open Graph
- **Accessible**: keyboard navigation, focus states, and ARIA labels
- **Microinteractions** and subtle animations
- **Social links** and “Buy Me a Coffee” support
- **Contact form** (customizable)
- **Tag system** for blog posts

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/terieyenike/portfolio.git
cd portfolio
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:4321](http://localhost:4321) to view your site.

---

## 🛠️ Project Structure

```
src/
  assets/         # Images, logos, and static assets
  components/     # Reusable UI components (e.g., ContactForm, PostItem)
  layouts/        # Layout components (BaseLayout, Header, Footer)
  pages/          # Astro pages (about, blog, contact, tags, etc.)
  content/        # Markdown blog posts
  utils/          # Utility functions (e.g., slugify)
public/           # Static files (robots.txt, favicon, etc.)
```

---

## 📝 Writing Blog Posts

- Add new posts in `src/content/blog/` as `.md` files.
- Use frontmatter for metadata:

```markdown
---
title: "My Awesome Post"
description: "A short summary of the post."
pubDate: 2025-06-04
image: "/assets/blog/cover.jpg"
tags: [astro, webdev]
readingTime: 4
---
```

---

## ⚙️ Customization

- **Site settings:** Edit `src/consts.ts` for site title, description, and social links.
- **Branding:** Replace logo files in `src/assets/img/`.
- **Colors & styles:** Adjust Tailwind config or CSS as needed.
- **Contact form:** Update `src/components/ContactForm.astro` for your preferred email or integration.

---

## 🌐 Deployment

You can deploy this site to any static host (Netlify, Vercel, GitHub Pages, etc.):

```bash
npm run build
# or
yarn build
```

The output will be in the `dist/` folder.

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Support

If you like this project, consider [buying me a coffee](https://www.buymeacoffee.com/eyenike)!

---

**Built with [Astro](https://astro.build) and ❤️ by Teri Eyenike**
