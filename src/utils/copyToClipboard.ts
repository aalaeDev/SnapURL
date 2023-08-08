/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { toast } from "react-hot-toast";

export default async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);

  toast.success("Copied Successfully!", {
    style: {
      border: "1px solid #262347",
      padding: "12px",
      color: "#A4A1C8",
      fontSize: "14px",
      boxShadow: "1px solid #262347",
      background: "rgba(16, 16, 24, 0.6)",
      backdropFilter: "blur(5px)",
    },
  });
}
