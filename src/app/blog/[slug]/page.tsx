// src/app/blog/[slug]/page.tsx
import { getAllBlogPosts } from "@/utils/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import TableOfContents from '@/components/TableOfContents';
import { headingStyles, CustomP, TocItem, makeHeading } from '@/app/markdownStyles';
import { monda } from "@/utils/fonts";

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
  // function makeHeading(level: 1|2|3) {
  //   return function HeadingComponent( { children }: { children: React.ReactNode } ) {
  //     const text = String(children);
  //     const baseId = text.toLowerCase().replace('/\s+/g', '-').replace('/^[\w-]/g', '');
  //     const id = baseId + `-${toc.length}`;
  //     const TocItem = { id: id, text: text, level: level };
  //     toc.push(TocItem); 

  //     const Tag = `h${level}` as const // h1 or h2 or h3 (dynamic HTML tag name)
  //     return <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]}`}>{children}</Tag>
  //   }
  // }
  // function makeHeading(level: 1 | 2 | 3) {
  //   // 1. Accept all standard HTML attributes for a Heading Element
  //   return function HeadingComponent({ 
  //     children, 
  //     ...props 
  //   }: React.HTMLAttributes<HTMLHeadingElement>) {

  //     // 2. Edge case - children might be null/undefined or not a string
  //     const text = children ? String(children) : '';

  //     const baseId = text
  //       .toLowerCase()
  //       .replace(/\s+/g, '-') // replace any whitespaces with -
  //       .replace(/[^\w-]/g, ''); // remove punctuations

  //     const id = baseId + `-${toc.length}`;

  //     // push to TOC if there is actual text
  //     if (text) {
  //       const TocItem = { id, text, level };
  //       toc.push(TocItem);
  //     }

  //     const Tag = `h${level}` as const;

  //     return (
  //       // 3. Pass the ...props through (important for libraries that inject classes/styles)
  //       <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]}`} {...props}>
  //         {children}
  //       </Tag>
  //     );
  //   };
  // }

  if (!post) return notFound();

  return (
    <div className="flex justify-center items-start mx-auto max-w-[80vw] mt-15">


      <div className="flex flex-col mr-10 w-[75%]"> {/* page (minus TOC) */}
        <div className={`flex ${monda.className} prose min-w-0`}> {/* header */}
          {/* icon */}
          {post.frontmatter.image && (
            <img src={post.frontmatter.image} alt={post.frontmatter.title} className="w-[100px] h-[100px] flex-shrink-0 mr-6" />
          )}

          <div className='flex flex-col max-w-full'>
            {/* title */}
            <div className="text-3xl whitespace-wrap font-bold">{post.frontmatter.title}</div>

            {/* description */}
            <div className="mt-2 whitespace-wrap">{post.frontmatter.description}</div>

            {/* date */}
            <div className="mt-2 whitespace-wrap">{post.frontmatter.date}</div>
          </div>
        </div>

        <hr className="border-muted mt-6"></hr>

        {/* body */}
        <div className="prose">
          <ReactMarkdown components={{
            p: CustomP,
            h1: makeHeading(toc, 1),
            h2: makeHeading(toc, 2),
            h3: makeHeading(toc, 3),
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
