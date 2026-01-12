import Link from "next/link";

export type ProjectProps = {
  title: string;
  description: string;
  image?: string;
  href: string;
  tags: { [key: string]: string }; // { tagName: tagLink }
};

export default function ProjectCard({ title, description, tags }: ProjectProps) {
  return (
    <div className="flex flex-col border border-red-100">
      <div className="text-xl font-bold mb-2 font-monda">{title}</div>
      <p>{description}</p>
      <div className="flex flex-row gap-2"> {/* Flex row for tags */}
        {Object.entries(tags).map(([tagName, tagLink]) => (
          <Link key={tagName} href={tagLink}>
            <span className="text-blue-600 hover:underline border border-muted">{tagName}</span>
          </Link>
        ))}
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