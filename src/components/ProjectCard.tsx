import Link from "next/link";

export type ProjectProps = {
  title: string;
  description: string;
  image?: string;
  tags: { [key: string]: string }; // { tagName: tagLink }
};

export default function ProjectCard({ title, description, image, tags }: ProjectProps) {
  return (
    <div className="flex flex-col border border-muted rounded w-min transform transition-transform duration-200 hover:translate-x-1 hover:-translate-y-1"> {/* Make the card clickable */}
      
      {image && (
        <Link href={tags[Object.keys(tags)[0]]}>
          <img
            src={image}
            alt={title}
            className="mb-4 w-full h-48 object-cover rounded-t"
          />
        </Link>
      )}
      <div className="m-3">
        <Link href={tags[Object.keys(tags)[0]]}>
          <div className="text-xl font-bold mb-2 font-monda">{title}</div>
          <p>{description}</p>
        </Link>
        <div className="flex flex-row gap-2"> 
          {Object.entries(tags).map(([tagName, tagLink]) => (
            <Link key={tagName} href={tagLink} className="my-4">
              <span key={tagName} className="font-monda hover:bg-secondary hover:text-background border border-muted mr-1 my-4 p-2 rounded transition-all duration-100">
                {tagName}
              </span>
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