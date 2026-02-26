import Link from "next/link";
import { monda } from "@/utils/fonts";

type PostProps = {
  title: string;
  href: string;
  date: string;
  number: number; // post number
};

export default function PostCard({ title, href, date, number }: PostProps) {
  const [year, month, day] = date.split("-");

  return (
    <Link href={href} className="block h-full w-full">
      <div className="relative rounded-lg p-3 w-full aspect-square cursor-pointer group">

        {/* Border */}
        <span className="absolute inset-0 rounded-lg border border-foreground/50 transition-all duration-200 group-hover:border-3 group-hover:border-[var(--yellow)]" />

        {/* Card content */}
        <div className={`relative h-full w-full rounded bg-background p-4 flex flex-col justify-between ${monda.className}`}>
          {/* Title */}
          <h3 className="text-lg font-semibold leading-snug line-clamp-3">
            {title}
          </h3>

          {/* Bottom row */}
          <div className="flex flex-row justify-between items-end text-sm font-mono opacity-80">
            <span>{year}.{month}.{day}</span>
            <span className="text-foreground/70">#{number}</span>
          </div>
        </div>

      </div>
    </Link>
  );
}