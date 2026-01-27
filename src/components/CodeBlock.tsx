// src/components/CodeBlock.tsx
'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ node, inline, className, children, ...props }: any) {
    const [copied, setCopied] = useState(false);

    // Extract language (e.g., "language-js" -> "js")
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        console.log("you clicked copy!")
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return <code className={className} {...props}>{children}</code>;
    }

    return (
        <div className="relative group my-6">
            {/* <button
                onClick={handleCopy}
                className="absolute z-10 right-2 top-2 p-2 rounded-md bg-zinc-700 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button> */}
            <SyntaxHighlighter
                language={match ? match[1] : 'text'}
                style={oneDark}
                customStyle={{ borderRadius: '8px', padding: '1.5rem' }}
                {...props}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
}