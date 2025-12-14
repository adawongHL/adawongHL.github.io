// src/app/projects/[slug]/page.tsx
import { getAllProjectPosts } from "@/utils/posts";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const projects = getAllProjectPosts();
  const project = projects.find(p => p.slug === slug);

  if (!project) return notFound();

  return (
    <article className="prose max-w-3xl mx-auto p-4">
      <h1>{project.frontmatter.title}</h1>
      {project.frontmatter.image && (
        <img src={project.frontmatter.image} alt={project.frontmatter.title} className="mb-4"/>
      )}
      <div dangerouslySetInnerHTML={{ __html: project.content }} />
    </article>
  );
}
