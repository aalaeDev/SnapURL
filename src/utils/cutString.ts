export function cutString(str: string, limit: number) {
  if (limit < 1) return str;
  return str.length > limit ? str.substring(0, limit) + "..." : str;
}
