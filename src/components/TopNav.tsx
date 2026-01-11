"use client";

export default function TopNav() {
  return (
    <div className="flex gap-6 my-8 h-12 items-center font-monda sticky top-0 bg-background">
      {[
        { label: "Home", href: "/" },
        { label: "Email", href: "mailto:business.adawong@gmail.com" },
        { label: "Github", href: "https://github.com/adawongHL" },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className="group"
        >
          <span className="relative inline-block">
            {/* hover underline */}
            <span
              className="
                pointer-events-none
                absolute left-0 bottom-0
                h-[2px] w-0
                bg-primary
                transition-all duration-150 ease-out
                group-hover:w-full
                left-1/2 -translate-x-1/2
              "
            />
            <span className="transition-colors duration-150 group-hover:text-primary font-bold">
              {label}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
