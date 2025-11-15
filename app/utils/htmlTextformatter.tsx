// Server-side HTML parser (no DOM)
export function parseJobDutiesServer(htmlString: string): string[] {
  if (!htmlString) return [];
  
  const duties: string[] = [];
  
  // Extract text from <li> tags
  const liMatches = htmlString.match(/<li>(.*?)<\/li>/g);
  if (liMatches) {
    liMatches.forEach(match => {
      // Remove HTML tags but preserve text
      let text = match
        .replace(/<\/?li>/g, '')
        .replace(/<strong>(.*?)<\/strong>/g, '$1') // Keep strong text
        .replace(/<em>(.*?)<\/em>/g, '$1') // Keep italic text
        .replace(/<\/?[^>]+(>|$)/g, '') // Remove remaining tags
        .replace(/&nbsp;/g, ' ') // Replace HTML entities
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .trim();
      
      if (text) {
        duties.push(text);
      }
    });
  } else {
    // Fallback: strip all tags and try to extract meaningful content
    let cleanText = htmlString
      .replace(/<strong>Responsibilities:<\/strong>/gi, '')
      .replace(/<\/?p>/g, '\n')
      .replace(/<\/?ul>/g, '')
      .replace(/<\/?ol>/g, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Split by common delimiters
    const lines = cleanText
      .split(/[.\n]/)
      .map(line => line.trim())
      .filter(line => line.length > 10 && line !== 'Responsibilities');
    
    if (lines.length > 0) {
      duties.push(...lines);
    } else if (cleanText) {
      // If no good splits found, just use the whole text
      duties.push(cleanText);
    }
  }
  
  return duties;
}
