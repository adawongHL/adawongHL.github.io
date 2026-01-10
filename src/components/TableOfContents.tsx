
// heading in table of contents
import { TocItem } from '@/app/markdownStyles';

// styles for h1, h2, h3, p  
export const tocStyles: Record<1 | 2 | 3, string> = {
    1: "ml-2",
    2: "ml-6",
    3: "ml-10",
}

export default function TableOfContents({ headings }: { headings: TocItem[] }) {
    return (
    <div className='flex flex-col'>
        {
            headings.map(
                (heading) => (
                    <a 
                    key={heading.id}
                    href={`#${heading.id}`} 
                    className={`${tocStyles[heading.level]} hover:underline`}>
                        {heading.text}
                    </a>
                )
            )
        }
    </div>);
}

// iterate through each heading inside array headingStyles
// for each heading: 
//     render a <className= check its heading.level> for the heading

// function to use is Array.map(function) because its able to apply a function
// to each member inside of the array
// even though .mpa returns an array, react is smart to render 
// each member as a Component

    
