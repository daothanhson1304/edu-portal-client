export function htmlToPlain(textHtml: string, maxLen = 160) {
  const stripped = textHtml
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen).trimEnd() + '…';
}
