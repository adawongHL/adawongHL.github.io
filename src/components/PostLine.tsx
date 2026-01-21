// src/components/PostCard.tsx
// appearance of each post on the landing page
// TODO: Hover over PostCard to see % bar for tech stack
import Link from "next/link";
import { monda } from "@/utils/fonts";

type PostProps = {
  title: string;
  href: string;
  date: string;
};

export default function PostLine({ title, href, date }: PostProps) {
  const [year, month, day] = date.split("-");

  return (
    <Link href={href}>
      <div className={`group ${monda.className} flex flex-row justify-between items-end cursor-pointer`}>

        {/* Title */}
        <div className="relative inline-block">
          <h3 className="mb-2 transition-all duration-150 text-foreground/85 group-hover:text-foreground mr-8">{title}</h3>
          {/* <span className="absolute left-0 bottom-1 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />  */}
        </div>

        {/* Date */}
        <div className="relative inline-block font-mono">
          <p className="transition duration-150 group-hover:opacity-100 opacity-80 font-mono">
            {year}.{month}.{day}
          </p>
          <span className="absolute left-0 bottom-0.2 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
        </div>

      </div>
    </Link>
  );
}
