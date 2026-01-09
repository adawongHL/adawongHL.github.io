// src/app/blog/[slug]/page.tsx
import { getAllBlogPosts } from "@/utils/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogs = getAllBlogPosts();
  return blogs.map(blog => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <article className="prose max-w-3xl mx-auto p-4">
      <h1>{post.frontmatter.title}</h1>
      {post.frontmatter.image && (
        <img src={post.frontmatter.image} alt={post.frontmatter.title} className="mb-4"/>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
