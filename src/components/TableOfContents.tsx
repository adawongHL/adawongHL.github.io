'use client';

import { TocItem } from '@/app/markdownStyles';
import { useEffect, useState } from 'react';
import { monda } from '@/utils/fonts';

export const tocStyles: Record<1 | 2 | 3, string> = {
  1: 'ml-2',
  2: 'ml-6',
  3: 'ml-10',
};

export default function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // set initial active heading to be the first one
  useEffect(() => {
    if (headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [headings]);

  // observe heading that's actively viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -80% 0px', // define our active viewport (top, right, bottom, left)
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // look out for scroll to bottom - highlight the last heading
  useEffect(() => {
    function onScroll() {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (scrolledToBottom && headings.length > 0) {
        setActiveId(headings[headings.length - 1].id);
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);


  return (
    <nav className="flex flex-col space-y-1">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={() => setActiveId(heading.id)}
          className={`
            my-1
            ${tocStyles[heading.level]}
            transition-colors
            ${monda.className}
            ${activeId === heading.id
              ? 'text-secondary dark:text-[var(--yellow)] font-semibold'
              : 'text-[var(--grey)] dark:text-muted hover:text-foreground'
            }
          `}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
