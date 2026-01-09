// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
import TopNav from "@/components/TopNav";
// import MosaicMap from "@/components/MosaicMap";
import { getAllBlogPosts, getAllProjectPosts } from "@/utils/posts";

export default function HomePage() {
  const projectPosts = getAllProjectPosts();
  const blogPosts = getAllBlogPosts();
  const highlightProjects = projectPosts.filter(post => {return post.frontmatter.highlight === true})
  const highlightBlogs = blogPosts.filter(post => {return post.frontmatter.highlight === true})

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Top Icons: email, github */}
      <TopNav />

      {/* Hero Section */}
      <div className="flex">
        <header className="mb-16 text-left font-monda">
          <h1 className="text-5xl font-bold mb-4">Ada's Fieldnotes</h1>
          <p className="text-lg text-gray-600">About me oneliner...</p>
          <p className="text-lg text-gray-600">I like to make stuff</p>
        </header>

        <div>MAP HERE</div>
        {/* TODO: Map Graphics Section */}

      </div>

      

      {/* Highlights Section (To Curate) */}
      <section id="highlights" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Highlights</h2>
        <div className="grid grid-cols-4 gap-0 overflow-hidden">
          {   
          highlightProjects.map(post => (
            <PostCard
              key={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              image={post.frontmatter.image}
              href={`/projects/${post.slug}`}
            />
          ))}
          {
          highlightBlogs.map(post => (
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
        <h2 className="text-3xl font-bold font-monda mb-6">Projects</h2>
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
        <h2 className="text-3xl font-bold font-monda mb-6">Blog</h2>
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
