import { monda } from "@/utils/fonts";
import Image from 'next/image'

export default function Header() {
  return (
    // <header className={`mb-16 text-left ${monda.className} w-full animate-fade-in`}>
    //   <h1 className="text-5xl font-bold mb-4">
    //     Hi, I'm Ada!
    //   </h1>
      
    //   <p className="mt-4 text-3xl">
    //     I tinker, build and write 🏔️
    //   </p>
    //   <div className="flex items-center">
    //   {/* <div className="w-3 h-3 shrink-0 rounded-full bg-blue-500 animate-blink mr-2"></div> */}
    //     {/* <p className="my-2">
    //       Currently: Building a TUI game in Python that teaches bash && writing blog posts
    //     </p> */}
    //   </div>

  // </header>

    <div className="flex mb-12 items-center animate-fade-in">
      {/* profile */}
      <img
          src="/images/profile_circle.png"
          width={150}
          height={150}
          className=""
        />
      {/* name */}
      <div className="flex flex-col justify-center font-monda ml-2">
        <div className="flex text-3xl font-bold items-center">Ada W.</div>
        <p>I tinker, build and write 🏔️</p>
      </div>
    </div>
  );
}
