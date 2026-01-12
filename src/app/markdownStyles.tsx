// styles for h1, h2, h3, p
export const headingStyles: Record<1 | 2 | 3, string> = {
    1: "text-3xl font-bold text-foreground mt-6 mb-5",
    2: "text-2xl font-bold text-foreground mt-6 mb-4",
    3: "text-xl font-semibold text-foreground mt-6 mb-3",
  }

import type { ComponentProps } from "react";

type ParagraphProps = ComponentProps<"p"> & {
  node?: unknown; // must be optional
};
// export const CustomP({ node, ...props }: ParagraphProps) {
//   return <p className="my-8 leading-relaxed text-foreground" {...props} />;
// }
export const CustomP = ({ node, ...props }: ParagraphProps) => (
<p className="my-8 leading-relaxed text-foreground" {...props} />
)

// table of contents - heading item
export type TocItem = {
  id: string
  text: string
  level: 1 | 2 | 3
}

export function makeHeading(toc: Array<{ id: string; text: string; level: number }>, level: 1 | 2 | 3) {
  // 1. Accept all standard HTML attributes for a Heading Element
  return function HeadingComponent({ 
    children, 
    ...props 
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    
    // 2. Edge case - children might be null/undefined or not a string
    const text = children ? String(children) : '';
    
    const baseId = text
      .toLowerCase()
      .replace(/\s+/g, '-') // replace any whitespaces with -
      .replace(/[^\w-]/g, ''); // remove punctuations
    
    const id = baseId + `-${toc.length}`;

    // push to TOC if there is actual text
    if (text) {
      const TocItem = { id, text, level };
      toc.push(TocItem);
    }

    const Tag = `h${level}` as const;
    
    return (
      // 3. Pass the ...props through (important for libraries that inject classes/styles)
      <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]}`} {...props}>
        {children}
      </Tag>
    );
  };
}