// src/app/page.tsx (Landing Page)
import PostCard from "@/components/PostCard";
import PostLine from "@/components/PostLine";
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
      <div className="flex">
        <header className="mb-16 text-left font-monda">
          <h1 className="text-5xl font-bold mb-4">Hi, I'm Ada!</h1>
          <p className="text-lg text-gray-600">🏔️ I like to build things</p>
        </header>

        {/* TODO: Map Graphics Section */}
        {/* <MosaicMap data={data} width={700} height={500} /> */}

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
