// src/app/project/[slug]/page.tsx
import { getAllProjectPosts } from "@/utils/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import TableOfContents from "@/components/TableOfContents";
import { headingStyles, CustomP, TocItem, makeHeading } from "@/app/markdownStyles";

export async function generateStaticParams() {
  const projects = getAllProjectPosts();
  return projects.map(project => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const projects = getAllProjectPosts();
  const project = projects.find((p) => p.slug === slug);

  const toc: TocItem[] = []; // contains all headings; pass to TableOfContents component as prop later
  // factory function to create a new heading React component (tagged with id)
  // headingLevel is passed by me
  // children is passed from react markdown; contains the heading text
  // function makeHeading(level: 1 | 2 | 3) {
  //   return function HeadingComponent({ children }: { children: React.ReactNode }) {
  //     const text = String(children);
  //     const baseId = text
  //       .toLowerCase()
  //       .replace('/\\s+/g', '-')
  //       .replace('/^[\\w-]/g', '');
  //     const id = baseId + `-${toc.length}`;

  //     const TocItem = { id, text, level };
  //     toc.push(TocItem);

  //     const Tag = `h${level}` as const;
  //     return (
  //       <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]}`}>
  //         {children}
  //       </Tag>
  //     );
  //   };
  // }

  if (!project) return notFound();

  return (
    <div className="flex justify-center items-start mx-auto max-w-[80vw] mt-15">
      <div className="flex flex-col mr-10 w-[75%]">
        {/* page (minus TOC) */}

        <div className="flex font-monda prose min-w-0">
          {/* header */}
          {project.frontmatter.image && (
            <img
              src={project.frontmatter.image}
              alt={project.frontmatter.title}
              className="w-[100px] h-[100px] flex-shrink-0 mr-6"
            />
          )}

          <div className="flex flex-col max-w-full">
            {/* title */}
            <div className="text-3xl whitespace-wrap font-bold">
              {project.frontmatter.title}
            </div>

            {/* date */}
            <div className="mt-2 whitespace-wrap">
              {project.frontmatter.date}
            </div>
          </div>
        </div>

        <hr className="border-muted mt-6" />

        {/* body */}
        <div className="prose">
          <ReactMarkdown
            components={{
              p: CustomP,
              h1: makeHeading(toc, 1),
              h2: makeHeading(toc, 2),
              h3: makeHeading(toc, 3),
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* table of contents */}
      <aside className="w-1/4 sticky top-52 self-start">
        <TableOfContents headings={toc} />
      </aside>
    </div>
  );
}