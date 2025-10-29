export function createExcerpt(body: string, maxLength: number = 200): string {

  if (body.length <= maxLength) return body;
  return body.substring(0, maxLength).trim() + '...';
}