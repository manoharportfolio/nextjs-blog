# Next.js Blog (Satoru Foundation assignment)

**What this is:**  
A dynamic blog platform built with Next.js + MongoDB. It includes REST API routes, a paginated searchable homepage, dynamic post pages, and a simple admin UI for creating/editing posts with a rich text editor.

## Features
- Homepage with paginated posts
- Dynamic post page (`/blog/[slug]`)
- REST API: `GET /api/blogs`, `GET /api/blogs/[slug]`, `POST /api/blogs`, `PUT /api/blogs/[slug]`, `DELETE /api/blogs/[slug]`
- Search and tag filtering
- Admin UI for create/update/delete (rich text editor using `react-quill`)
- Image support (via image URLs) — instructions below for uploading to Cloudinary or local hosting.

## Stack
- Next.js (React)
- MongoDB via Mongoose
- react-quill (rich text editor)
- Axios for client-side API calls

## Setup (local)
1. Clone this repo:
   ```bash
   git clone <your-repo-url>
   cd nextjs-blog
