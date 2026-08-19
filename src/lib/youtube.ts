/**
 * Parses a YouTube URL and extracts the Video ID.
 * Supports:
 * - youtube.com/watch?v=ID
 * - youtu.be/ID
 * - youtube.com/embed/ID
 * - youtube.com/shorts/ID
 * 
 * Returns the video ID if valid, or null if invalid.
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname === 'youtu.be') {
      const path = urlObj.pathname.slice(1); // remove leading slash
      // Ensure it's not empty and doesn't contain another slash
      if (path && path.indexOf('/') === -1) {
        return path;
      }
    } else if (hostname === 'www.youtube.com' || hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      // Check for watch?v=
      if (urlObj.pathname === '/watch') {
        const v = urlObj.searchParams.get('v');
        if (v) return v;
      }
      
      // Check for /embed/ID or /shorts/ID
      if (urlObj.pathname.startsWith('/embed/') || urlObj.pathname.startsWith('/shorts/')) {
        const parts = urlObj.pathname.split('/');
        if (parts.length >= 3 && parts[2]) {
          return parts[2];
        }
      }
    }
    
    return null;
  } catch {
    // Invalid URL format
    return null;
  }
}

export function validateYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}
