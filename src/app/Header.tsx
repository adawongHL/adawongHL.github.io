import { monda } from "@/utils/fonts";

export default function Header() {
  return (
    <header className={`mb-16 text-left ${monda.className} w-full animate-fade-in`}>
      <h1 className="text-5xl font-bold mb-4">
        Hi, I'm Ada!
      </h1>
      <p className="text-lg">
        I tinker, build and write 🏔️
      </p>
      <div className="flex items-center">
        <div className="w-3 h-3 shrink-0 rounded-full bg-blue-500 animate-blink mr-2"></div>
        <p className="my-2">
          Currently: Building a TUI game in Python that teaches bash && writing blog posts
        </p>
      </div>

    </header>
  );
}
