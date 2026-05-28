# NewsPortal

A full-featured news portal built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.js.

![NewsPortal](https://images.unsplash.com/photo-1504711434969-e33886168d4c?w=800)

## Features

### Public Pages
- **Home Page** — Featured articles, latest news, popular articles sidebar, category listing
- **Category Pages** — Browse articles by category with article counts
- **Article Detail** — Full article view with reading time, view counter, related articles, and share buttons
- **Search** — Full-text search across article titles, excerpts, and content
- **Responsive Design** — Mobile-first design that looks great on all devices

### Admin Dashboard
- **Authentication** — Secure login with NextAuth.js credentials provider
- **Dashboard** — Overview with stats (total articles, published, views, categories)
- **Article Management** — Create, edit, publish/unpublish, feature, and delete articles
- **Category Management** — Add and remove categories with custom colors

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd news-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Set up the database:**
   ```bash
   npm run db:setup
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

### Default Admin Credentials

- **Email:** admin@newsportal.com
- **Password:** admin123

## Project Structure

```
news-portal/
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── public/
│   └── uploads/          # Uploaded images
├── src/
│   ├── app/
│   │   ├── admin/        # Admin dashboard pages
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── articles/
│   │   │   └── categories/
│   │   ├── api/          # API routes
│   │   │   ├── auth/
│   │   │   ├── articles/
│   │   │   └── categories/
│   │   ├── article/      # Article detail page
│   │   ├── category/     # Category page
│   │   ├── search/       # Search page
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable components
│   │   ├── ArticleCard.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── lib/              # Utility functions
│       ├── auth.ts
│       ├── prisma.ts
│       └── utils.ts
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List all articles |
| POST | `/api/articles` | Create article (auth required) |
| GET | `/api/articles/[id]` | Get article by ID |
| PUT | `/api/articles/[id]` | Update article (auth required) |
| DELETE | `/api/articles/[id]` | Delete article (auth required) |
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category (auth required) |
| DELETE | `/api/categories?id=` | Delete category (auth required) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:setup` | Push schema + seed data |

## License

ISC
