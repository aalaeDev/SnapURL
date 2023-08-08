import React from "react";
import CopyIcon from "./CopyIcon";
import Link from "next/link";
import copyToClipboard from "~/utils/copyToClipboard";

interface UrlBoxProps {
  url: string;
}

export default function UrlBox({ url }: UrlBoxProps) {
  return (
    <div className="flex w-fit items-center gap-4 rounded-md border border-main bg-main bg-opacity-25 px-4 py-2 text-sm text-main">
      <Link
        href={url}
        className="duration-200 hover:underline hover:brightness-125"
      >
        {url}
      </Link>

      <button onClick={() => void copyToClipboard(url)}>
        <CopyIcon />
      </button>
    </div>
  );
}
