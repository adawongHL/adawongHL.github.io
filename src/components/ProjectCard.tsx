import Link from "next/link";

export type ProjectProps = {
  title: string;
  description: string;
  image?: string;
  tags: { [key: string]: string }; // { tagName: tagLink }
};

export default function ProjectCard({ title, description, image, tags }: ProjectProps) {
  return (
    <div className="flex flex-col border border-muted rounded">
      {image && (
          <img
            src={image}
            alt={title}
            className="mb-4 w-full h-48 object-cover rounded-t"
          />
        )}
      <div className="m-3">
      <div className="text-xl font-bold mb-2 font-monda">{title}</div>
      <p>{description}</p>
      <div className="flex flex-row gap-2"> {/* Flex row for tags */}
        {Object.entries(tags).map(([tagName, tagLink]) => (
          <Link key={tagName} href={tagLink} className="relative my-6 hover:translate-y-0.5 hover:translate-x-0.5 transition-all duration-200">
            <span className="font-monda hover:bg-secondary hover:text-background border border-muted mr-1 p-2 rounded 
            transition-all duration-100 ">{tagName}</span>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}

// const sampleProjectProps: ProjectProps = {
//     title: "My Awesome Project",
//     description: "This project is a web application built using React and Next.js. It allows users to manage their tasks efficiently.",
//     image: "https://example.com/image.png", // Optional
//     href: "https://example.com/my-awesome-project",
//     tags: {
//       "React": "https://reactjs.org",
//       "Next.js": "https://nextjs.org",
//       "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
//       "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
//     }
//   };