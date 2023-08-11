import React from "react";
import { cutString } from "~/utils/cutString";
import UrlBox from "./UrlBox";
import copyToClipboard from "~/utils/copyToClipboard";
import Link from "next/link";
import RegenerateIcon from "./Icons/RegenerateIcon";
import CopyIcon from "./Icons/CopyIcon";
import QrIcon from "./Icons/QrIcon";
import AnalyticsIcon from "./Icons/AnalyticsIcon";
import QRCode from "react-qr-code";
import Tooltip from "./ui/Tooltip";
import { AnimatePresence, motion } from "framer-motion";

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
  const [showQR, setShowQR] = React.useState<boolean>(false);
  return (
    <motion.div className="flex items-center gap-6 rounded-md border border-neutral-600 p-6 duration-200">
      <motion.div className="flex flex-col items-center gap-4">
        <div>Shortened link</div>
        <UrlBox url={cutString(shortUrl, 40)} />

        <div className="flex gap-3">
          <Tooltip content="Regenerate Url">
            <button
              onClick={regenerate}
              className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
            >
              <RegenerateIcon />
            </button>
          </Tooltip>

          <Tooltip content="Copy Url">
            <button
              onClick={() => void copyToClipboard(shortUrl)}
              className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
            >
              <CopyIcon />
            </button>
          </Tooltip>

          <Tooltip content="QR Code">
            <button
              onClick={() => {
                setShowQR(!showQR);
              }}
              className={`rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 ${
                showQR
                  ? "bg-neutral-600 bg-opacity-60 hover:bg-opacity-90"
                  : "hover:bg-neutral-600 hover:bg-opacity-60"
              }`}
            >
              <QrIcon />
            </button>
          </Tooltip>

          <Tooltip content="Analytics">
            <Link
              href={`${host}/analytics/${urlCode}`}
              target="_blank"
              className="rounded-md border border-neutral-600 p-2 text-neutral-200 duration-200 hover:bg-neutral-600 hover:bg-opacity-60"
            >
              <AnalyticsIcon />
            </Link>
          </Tooltip>
        </div>
      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="rounded-md bg-neutral-100 p-2"
          >
            <QRCode
              size={144}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={shortUrl}
              viewBox={`0 0 144 144`}
              bgColor="#FBFBFA"
              fgColor="#100F1C"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
