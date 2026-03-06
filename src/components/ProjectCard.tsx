import Link from "next/link";
import { monda } from "@/utils/fonts";

export type ProjectProps = {
  title: string;
  description: string;
  image?: string;
  tags: { [key: string]: string };
};

export default function ProjectCard({ title, description, image, tags }: ProjectProps) {
  const mainLink = tags[Object.keys(tags)[0]];

  return (
    <div className="relative group rounded-lg p-4 w-full max-w-2xl transition-transform duration-200 hover:translate-x-1 hover:-translate-y-1">
    <Link href={mainLink} className="w-full sm:w-auto">
      {/* Animated border */}
      <span className="pointer-events-none absolute inset-0 rounded-lg border-2 border-foreground opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />

      {/* Card content */}
      <div className="flex flex-col sm:flex-row items-start gap-4 rounded bg-background w-full">

        {/* Image */}
        {image && (
          
            <div className="w-full aspect-video sm:w-40 sm:h-40 sm:aspect-square flex-shrink-0 overflow-hidden rounded">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          
        )}

        {/* Text */}
        <div className="flex flex-col min-w-0 w-full">

            <h2 className={`text-3xl font-bold mb-2 ${monda.className}`}>
              {title}
            </h2>
            <p className="break-words">
              {description}
            </p>
        </div>

      </div>

      </Link>

      <div className="flex flex-row flex-wrap ">
            {Object.entries(tags).map(([tagName, tagLink]) => (
              <Link key={tagName} href={tagLink}>
                <span
                  className={`${monda.className} absolute top-33 left-48 hover:text-background hover:bg-[var(--yellow)] border border-muted p-2 rounded transition-all duration-100`}
                >
                  {tagName}
                </span>
              </Link>
            ))}
          </div>

    </div>
  );
}