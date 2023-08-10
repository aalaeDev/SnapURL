import { cutString } from "~/utils/cutString";
import UrlBox from "./UrlBox";
import copyToClipboard from "~/utils/copyToClipboard";
import Link from "next/link";
import RegenerateIcon from "./Icons/RegenerateIcon";
import CopyIcon from "./Icons/CopyIcon";
import QrIcon from "./Icons/QrIcon";
import AnalyticsIcon from "./Icons/AnalyticsIcon";
import { Tooltip } from "@radix-ui/themes";

interface UrlPanelProps {
  regenerate: () => void;
  shortUrl: string;
  urlCode: string;
}

const host = typeof window !== "undefined" ? window.location.origin : "";

export default function UrlPanel({
  shortUrl,
  urlCode,
  regenerate,
}: UrlPanelProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-neutral-600 p-6 ">
      <div>Shortened link</div>
      <UrlBox url={cutString(shortUrl, 40)} />

      <div className="flex gap-3">
        <button
          onClick={regenerate}
          className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
        >
          <RegenerateIcon />
        </button>

        <button
          onClick={() => void copyToClipboard(shortUrl)}
          className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
        >
          <CopyIcon />
        </button>
        <button
          //   onClick={() => {}}
          className="pointer-events-none rounded-md border border-neutral-600 p-2 text-neutral-200 opacity-50 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
        >
          <QrIcon />
        </button>
        <Link
          href={`${host}/analytics/${urlCode}`}
          target="_blank"
          className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
        >
          <AnalyticsIcon />
        </Link>
      </div>
    </div>
  );
}
