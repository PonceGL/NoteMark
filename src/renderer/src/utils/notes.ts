export function getTitle(content: string): string {
  const firstLine = content.slice(0, content.indexOf('\n'))
  return firstLine.replace(/^[^a-zA-Z0-9¿¡\p{Emoji_Presentation}]+/u, '')
}
