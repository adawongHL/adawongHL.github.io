"use client";

import Link from "next/link";
import { EnvelopeSimpleIcon, GithubLogoIcon, HouseIcon } from "@phosphor-icons/react";

export default function TopNav() {
  return (
    <div className="flex">
        <HouseIcon size={32} />
        <EnvelopeSimpleIcon size={32} />
        <GithubLogoIcon size={32} />
    </div>
      
  );
}
