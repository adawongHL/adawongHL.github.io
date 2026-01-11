// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
import TopNav from "@/components/TopNav";
import MosaicMap from "@/components/MosaicMap";
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
      <div className="flex">
        <header className="mb-16 text-left font-monda">
          <h1 className="text-5xl font-bold mb-4">Ada's Fieldnotes</h1>
          <p className="text-lg text-gray-600">About me oneliner...</p>
          <p className="text-lg text-gray-600">I like to make stuff</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </header>

        {/* TODO: Map Graphics Section */}
        <MosaicMap data={data} width={700} height={500} />

      </div>

      

      {/* Highlights Section (To Curate) */}
      <section id="highlights" className="mb-16">
        <h2 className="text-3xl font-bold font-monda mb-6">Highlights</h2>
        <div className="grid grid-cols-4 gap-0">
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
