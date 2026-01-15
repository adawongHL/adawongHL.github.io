// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
import Header from "./Header";
import ProjectCard from "@/components/ProjectCard";
import { ProjectProps } from "@/components/ProjectCard";
import TopNav from "@/components/TopNav";
// import MosaicMap from "@/components/MosaicMap";
import { data } from "@/components/MapData";
import { getAllBlogPosts, getAllProjects } from "@/utils/posts";

export default function HomePage() {
  // const projectPosts = getAllProjectPosts();
  const projects = getAllProjects();
  console.log(projects);
  const blogPosts = getAllBlogPosts();
  // const highlightProjects = projectPosts.filter(post => {return post.frontmatter.highlight === true})
  const highlightBlogs = blogPosts.filter(post => {return post.frontmatter.highlight === true})

  return (
    <main className="">

      {/* Hero Section */}
      <Header />
      

      {/* Highlights Section (To Curate) */}
      <section id="highlights" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Projects</h2>

        {/* getAlProjects() (DONE) --> create a ProjectCard for each project */}
        {
          projects.length === 0 ? 
          <p className="font-monda w-full">To be done...</p> :
          <div className="grid grid-cols-4 gap-0">
          { projects.map(project => (
            <ProjectCard 
              title={project.frontmatter.title}
              description={project.frontmatter.description}
              image={project.frontmatter.image}
              tags={project.frontmatter.tags}
              />
          ))}
          </div>
        }
      </section>

      {/* Old Projects Section */}
      {/* <section id="projects" className="mb-16">
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
      </section> */}

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
