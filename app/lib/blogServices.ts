// app/lib/blogService.ts

const API_BASE_URL = 'https://secneedles-latest.onrender.com/api/Blog';

export async function getAllBlogPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAllBlogPost`, {
      cache: 'no-store', // or 'force-cache' for static generation
      // next: { revalidate: 60 } // Optional: revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}