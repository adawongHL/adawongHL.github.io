// styles for h1, h2, h3, p
export const headingStyles: Record<1 | 2 | 3, string> = {
    1: "text-3xl font-bold text-foreground mt-6 mb-5",
    2: "text-2xl font-bold text-foreground mt-6 mb-4",
    3: "text-xl font-semibold text-foreground mt-6 mb-3",
  }
export const CustomP = ({ node, ...props }) => (
<p className="my-8 leading-relaxed text-foreground" {...props} />
)