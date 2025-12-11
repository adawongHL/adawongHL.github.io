app/
  page.tsx               <-- Landing page
  layout.tsx             <-- Global layout
  projects/
    [slug]/page.tsx      <-- Dynamic project detail page
  blog/
    [slug]/page.tsx      <-- Dynamic blog detail page
components/
  Header.tsx
  Section.tsx            <-- Optional wrapper for layout/spacing
  PostCard.tsx           <-- Reusable card for both projects and blog
data/                    <-- Contains the raw content of posts 
  projects/              
    project1.md          
  blog/
    post1.md
    post2.md
    ...                  <-- Markdown files for blog posts
public/
  images/                <-- Project/blog images, logos etc...


Questions: 
- How to make the blog update by itself? In the sense that all I need to create a new post is to add the md file, push the changes, and it will automatically include this new post on the landing page? 