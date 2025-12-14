// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
import { getAllBlogPosts, getAllProjectPosts } from "@/utils/posts";

export default function HomePage() {
  const projectPosts = getAllProjectPosts();
  const blogPosts = getAllBlogPosts();

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Hero Section */}
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg text-gray-600">Hi, I'm Ada!</p>
        <p className="text-lg text-gray-600">I like to make stuff</p>
      </header>

      {/* TODO: Map Graphics Section */}


      {/* Highlights Section */}
      <section id="highlights" className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectPosts.map(post => (
            <PostCard
              key={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              image={post.frontmatter.image}
              href={`/projects/${post.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        {projectPosts.map(post => (
            <PostLine
              key={post.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              href={`/projects/${post.slug}`}
            />
          ))}
      </section>

      {/* Blog Section */}
      <section id="blog" className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Blog</h2>
        {blogPosts.map(post => (
            <PostLine
              key={post.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              href={`/blog/${post.slug}`}
            />
          ))}
      </section>
    </main>
  );
}
