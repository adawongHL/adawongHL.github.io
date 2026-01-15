// src/utils/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// helper fn for reading Markdown directory
function readMarkdownDir(directory: string) {
  const fileNames = fs.readdirSync(directory);

  const items = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");   // remove .md extension
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  });

  return items.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getAllBlogPosts() {
  const blogDir = path.join(process.cwd(), "src/data/blog");
  return readMarkdownDir(blogDir);
}

// Obsolete: Projects aren't in posts anymore
export function getAllProjects() {
  const projectDir = path.join(process.cwd(), "src/data/projects");
  return readMarkdownDir(projectDir);
}