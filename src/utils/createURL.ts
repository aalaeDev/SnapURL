import { isWebUri } from "valid-url";
import generateShortURL from "~/utils/generateShortURL";

export default function createURL(URL: string, alias?: string) {
  // TODO: use zod instead
  if (!isWebUri(URL)) return;

  const host = typeof window !== "undefined" ? window.location.origin : "";
  const { shortCode, shortUrl } = generateShortURL(host, alias);
  return {
    originalUrl: URL,
    urlCode: shortCode,
    shortUrl: shortUrl,
  };
}
