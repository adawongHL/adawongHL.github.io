// src/app/blog/[slug]/page.tsx
import { getAllBlogPosts } from "@/utils/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import TableOfContents from '@/components/TableOfContents';
import { headingStyles, CustomP, TocItem } from '@/app/markdownStyles';

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
  // console.log("Content:", post.content, "****END");

  const toc: TocItem[] = [] // contains all headings; pass to TableOfContents component as prop later
  // factory function to create a new heading React component (tagged with id; format: function)
  // headingLevel is passed by me
  // children is passed from react markdown; contains the heading text; type ReactNode
  function makeHeading(level: 1|2|3) {
    return function HeadingComponent( { children } ) {
      const text = String(children);
      const baseId = text.toLowerCase().replace('/\s+/g', '-').replace('/^[\w-]/g', '');
      const id = baseId + `-${toc.length}`;
      const TocItem = { id: id, text: text, level: level };
      toc.push(TocItem); 
      
      const Tag = `h${level}` as const // h1 or h2 or h3 (dynamic HTML tag name)
      return <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]}`}>{children}</Tag>
    }
  }
  
  if (!post) return notFound();

  return (
    <div className="flex justify-center items-start mx-auto max-w-[80vw] mt-15">

      
      <div className="flex flex-col mr-10 w-[75%]"> {/* page (minus TOC) */}
          <div className="flex font-monda prose min-w-0"> {/* header */}
                {/* icon */}
                {post.frontmatter.image && (
                <img src={post.frontmatter.image} alt={post.frontmatter.title} className="w-[100px] h-[100px] flex-shrink-0 mr-6"/>
              )}

              <div className='flex flex-col max-w-full'>
                {/* title */}
                <div className="bg-red-100 text-3xl whitespace-wrap font-bold">{post.frontmatter.title}</div>

                {/* description */}
                <div className="bg-green-100 mt-2 whitespace-wrap">{post.frontmatter.date}</div>
              </div>
          </div>

          <hr className="border-muted mt-6"></hr>

          {/* body */}
          <div className="prose">
              <ReactMarkdown components={{
              p: CustomP,
              h1: makeHeading(1),
              h2: makeHeading(2),
              h3: makeHeading(3)
            }}>
                  {post.content}
              </ReactMarkdown></div>
          </div>


      {/* table of contents */}
      <aside className="w-1/4 sticky top-52 self-start">
        <TableOfContents headings={toc} />
      </aside>
      
      
    </div>
  );
}
