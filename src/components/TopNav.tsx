"use client";

import Link from "next/link";
import { EnvelopeSimpleIcon, GithubLogoIcon, HouseIcon } from "@phosphor-icons/react";

export default function TopNav() {
  return (
    <div className="flex gap-2 my-2">
      <a href="/" aria-label="Home">
        <HouseIcon size={32} />
      </a>

      <a href="mailto:business.adawong@gmail.com" 
      aria-label="Email"
      className=""
      >
        <EnvelopeSimpleIcon size={32} />
      </a>

      <a
        href="https://github.com/adawongHL"
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <GithubLogoIcon size={32} />
      </a>
    </div>

      
  );
}
