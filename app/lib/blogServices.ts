const API_BASE_URL = 'https://secneedles-webapi.onrender.com/api/Blog';

export interface BlogComment {
  commentId: number;
  blogId: number;
  comment: string;
  emailAddress: string;
  dateCreated: string;
  createdBy: string;
  isLocked: number;
  isEdited: boolean;
  dateEdited: string | null;
}

export interface BlogPost {
  blogId: number;
  blogTItle: string; // Note: API has typo in field name
  blogBody: string;
  likes: number;
  dateCreated: string;
  createdBy: string;
  blogImage: string | null;
  updatedBy: string | null;
  dateUpdated: string | null;
  comments: BlogComment[];
  thumnailImage: string | null; // Note: API has typo in 'thumnail'
  formatedLikes: string;
}

export interface BlogPostResponse {
  payload: BlogPost;
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export interface AllBlogPostsResponse {
  payload: BlogPost[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export async function getAllBlogPosts(): Promise<AllBlogPostsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAllBlogPost`, {
      cache: 'no-store', // Force SSR on every request
      // Alternative for ISR (Incremental Static Regeneration):
      // next: { revalidate: 3600 } // Revalidate every hour
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

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Use your Next.js API route instead of calling the external API directly
    const response = await fetch(`/api/blog/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BlogPostResponse = await response.json();
    
    // Check if the request was successful and return the payload
    if (data.result === 1 && data.payload) {
      return data.payload;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}