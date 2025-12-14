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
        <div className="font-monda flex flex-row justify-between hover:underline hover:bg-secondary transition duration-200">
            <h3 className="text-xl mb-2">{title}</h3>
            <p className="font-mono">{year}.{month}.{day}</p>
        </div>
    </Link>
  );
}
