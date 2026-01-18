import { monda } from "@/utils/fonts";

export default function Header() {
  return (
    <header className={`mb-16 text-left ${monda.className} w-full animate-fade-in`}>
      <h1 className="text-5xl font-bold mb-4">
        Hi, I'm Ada!
      </h1>
      <p className="text-lg text-gray-600">
        I tinker, build and write 🏔️
      </p>
    </header>
  );
}
