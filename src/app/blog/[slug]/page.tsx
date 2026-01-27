// src/app/blog/[slug]/page.tsx
import { getAllBlogPosts } from "@/utils/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import TableOfContents from '@/components/TableOfContents';
import { headingStyles, CustomP, TocItem, makeHeading } from '@/app/markdownStyles';
import CodeBlock from '@/components/CodeBlock';
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

  if (!post) return notFound();

  // ignore code blocks so that comment lines (#) aren't misinterpretted as headings
  const contentWithoutCodeBlocks = post.content.replace(/```[\s\S]*?```/g, "");

  // find all our headings first to ensure all  are present before passing it to TableOfContents downstairs
  // ^ pattern: "data lifting" in react
  const toc: TocItem[] = [];
  const headingRegex = /^(#{1,3})\s+(.*)$/gm;

  let match;
  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].trim();

    // create id for this heading (so that clicking on it in TOC will bring us there)
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    toc.push({ id, text, level });
  }

  return (
    <div className="flex justify-center items-start mx-auto mt-15 w-full max-w-[98vw] lg:max-w-[80vw] px-4 lg:px-0">


      <div className="flex flex-col mr-10 w-full lg:w-[75%] lg:mr-10"> {/* page (minus TOC) */}
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

        <hr className="border-muted mt-6 mr-8"></hr>

        {/* body */}
        <div className="prose lg:mr-18 mr-0 mb-20">
          <ReactMarkdown components={{
            p: CustomP,
            h1: makeHeading(toc, 1),
            h2: makeHeading(toc, 2),
            h3: makeHeading(toc, 3),
            code: CodeBlock,
            ol: ({ children }) => <ol className="list-decimal text-foreground ml-12 my-4 lg:text-xl text-md">{children}</ol>,
            li: ({ children }) => <li className="list-disc text-foreground my-4 ml-12 lg:text-xl text-md">{children}</li>,
          }}>
            {post.content}
          </ReactMarkdown></div>
      </div>


      {/* table of contents */}
      <aside className="hidden lg:block w-1/4 sticky top-52 self-start max-h-[calc(100vh-300px)] overflow-y-auto pr-4 custom-scrollbar">
        <TableOfContents headings={toc} />
      </aside>

    </div>
  );
}
