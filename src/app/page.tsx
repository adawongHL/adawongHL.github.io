// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
import Header from "./Header";
import ProjectCard from "@/components/ProjectCard";
import { ProjectProps } from "@/components/ProjectCard";
import TopNav from "@/components/TopNav";
// import MosaicMap from "@/components/MosaicMap";
import { data } from "@/components/MapData";
import { getAllBlogPosts, getAllProjectPosts } from "@/utils/posts";

export default function HomePage() {
  const projectPosts = getAllProjectPosts();
  const blogPosts = getAllBlogPosts();
  const highlightProjects = projectPosts.filter(post => {return post.frontmatter.highlight === true})
  const highlightBlogs = blogPosts.filter(post => {return post.frontmatter.highlight === true})

  return (
    <main className="">

      {/* Hero Section */}
      <Header />
      

      {/* Highlights Section (To Curate) */}
      <section id="highlights" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Highlights</h2>
        
        { 
          highlightProjects.length === 0 && highlightBlogs.length === 0 ? (
            <p className="font-monda w-full">To be done...</p>
          ) : (
            <div className="grid grid-cols-4 gap-0">
              {highlightProjects.map(post => (
                <PostCard
                  key={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  image={post.frontmatter.image}
                  href={`/projects/${post.slug}`}
                />
              ))}
              {highlightBlogs.map(post => (
                <PostCard
                  key={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  image={post.frontmatter.image}
                  href={`/projects/${post.slug}`}
                />
              ))}
            </div>
          )
        }
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Projects</h2>
        {
          projectPosts.length > 0 ?
        projectPosts.map(post => (
            <PostLine
              key={post.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              href={`/projects/${post.slug}`}
            />
          )) : <p className="font-monda w-full">To be done...</p>}
      </section>

      {/* Blog Section */}
      <section id="blog" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Blog</h2>
        { blogPosts.length > 0 ? 
        blogPosts.map(post => (
            <PostLine
              key={post.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              href={`/blog/${post.slug}`}
            />
          )) : <p className="font-monda w-full">To be done...</p>}
      </section>
    </main>
  );
}
