import { nanoid } from "nanoid";

export default function generateShortURL(host: string, alias?: string) {
  const shortCode = alias ? encodeURIComponent(alias) : nanoid(10);
  return {
    shortCode,
    shortUrl: `${host}/${shortCode}`,
  };
}
