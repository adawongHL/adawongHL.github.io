import { roboto } from "@/utils/fonts";

// styles for h1, h2, h3, p
export const headingStyles: Record<1 | 2 | 3, string> = {
  1: "lg:text-5xl text-2xl font-bold text-foreground lg:mt-24 mt-12 mb-10 mb-5",
  2: "lg:text-3xl text-xl font-bold text-foreground lg:mt-14 mt-8 mb-4",
  3: "lg:text-2xl text-lg font-semibold text-foreground mt-6 mb-3",
}

import type { ComponentProps } from "react";

type ParagraphProps = ComponentProps<"p"> & {
  node?: unknown; // must be optional
};

export const CustomP = ({ node, ...props }: ParagraphProps) => (
  <p className="my-7 leading-loose text-foreground lg:text-xl md:text-xl sm:text-md dark:text-foreground" {...props} />
)

// table of contents - heading item
export type TocItem = {
  id: string
  text: string
  level: 1 | 2 | 3
}

export function makeHeading(toc: Array<{ id: string; text: string; level: number }>, level: 1 | 2 | 3) {
  return function HeadingComponent({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {

    // edge case - children might be null/undefined or not a string
    const text = children ? String(children) : '';

    // generate id the same way page.tsx (blog) generates id
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    const Tag = `h${level}` as const;

    return (
      <div>
        <Tag id={id} className={`scroll-mt-24 ${headingStyles[level]} font-monda`} {...props}>
          {children}
        </Tag>
      </div>
    );
  };
}