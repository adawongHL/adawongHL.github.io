// src/components/PostCard.tsx
// appearance of each post on the landing page
// TODO: Hover over PostCard to see % bar for tech stack
import Link from "next/link";

type PostProps = {
  title: string;
  href: string;
  date: string;
};

export default function PostLine({ title, href, date }: PostProps) {
    const [year, month, day] = date.split("-");

  return (
    <Link href={href}>
      <div className="group font-monda flex flex-row justify-between items-end cursor-pointer">
        
        {/* Title */}
        <div className="relative inline-block">
          <h3 className="text-xl mb-2 group-hover:font-bold">{title}</h3>
          <span className="absolute left-0 bottom-1 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
        </div>

        {/* Date */}
        <div className="relative inline-block font-mono">
          <p className="group-hover:font-bold">
            {year}.{month}.{day}
          </p>
          <span className="absolute left-0 bottom-0.2 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
        </div>

      </div>
    </Link>
  );
}
