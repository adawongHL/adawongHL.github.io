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
    <Link
      href={href}
      className="group relative block p-4 transition-transform duration-300 ease-out
                hover:-translate-y-1 hover:translate-x-1 border border-muted"
    >
      {/* Animated border */}
      <span className="pointer-events-none absolute inset-0">
        {/* Top */}
        <span className="absolute top-0 left-0 h-[2px] w-0 bg-muted transition-all duration-150 group-hover:w-full" />
        {/* Right */}
        <span className="absolute top-0 right-0 w-[2px] h-0 bg-muted transition-all duration-150 delay-50 group-hover:h-full" />
        {/* Bottom */}
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-muted transition-all duration-150 delay-60 group-hover:w-full" />
        {/* Left */}
        <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-muted transition-all duration-150 delay-70 group-hover:h-full" />
      </span>

      {/* Card content */}
      <div className="relative transition-transform duration-300 ease-out">
        {image && (
          <img
            src={image}
            alt={title}
            className="mb-4 w-full h-48 object-cover rounded"
          />
        )}
        <h3 className="text-xl font-bold mb-2 font-monda">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>

  
  );
}
