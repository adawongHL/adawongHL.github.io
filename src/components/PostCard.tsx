// src/components/PostCard.tsx
// appearance of each post on the landing page
// TODO: Hover over PostCard to see % bar for tech stack
import Link from "next/link";

type PostProps = {
  title: string;
  description: string;
  image?: string;
  href: string;
};

export default function PostCard({ title, description, image, href }: PostProps) {
  return (
    <Link href={href}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition p-4 cursor-pointer">
        {image && <img src={image} alt={title} className="mb-4 w-full h-48 object-cover rounded"/>}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
