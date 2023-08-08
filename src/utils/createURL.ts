import { isWebUri } from "valid-url";
import generateShortURL from "~/utils/generateShortURL";

export default function createURL(URL: string) {
  if (!isWebUri(URL)) return;

  const host = typeof window !== "undefined" ? window.location.origin : "";
  const { shortCode, shortUrl } = generateShortURL(host);
  return {
    originalUrl: URL,
    urlCode: shortCode,
    shortUrl: shortUrl,
  };
}
