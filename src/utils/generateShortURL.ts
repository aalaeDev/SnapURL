import { nanoid } from "nanoid";

export default function generateShortURL(host: string) {
  const shortCode = nanoid(10);
  return {
    shortCode,
    shortUrl: `${host}/${shortCode}`,
  };
}
