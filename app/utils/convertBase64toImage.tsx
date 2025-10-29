// Helper function to convert base64 to data URL for Next.js Image
export function getImageSrc(base64String: string | null): string | null {
  if (!base64String) return null;
  
  // Check if it's already a data URL
  if (base64String.startsWith('data:')) {
    return base64String;
  }
  
  // Add data URL prefix if it's raw base64
  return `data:image/jpeg;base64,${base64String}`;
}