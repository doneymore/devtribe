// app/types/blog.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
  updatedAt?: string;
  // Add other fields based on your actual API response
}

export interface BlogResponse {
  posts: BlogPost[];
  // Add other fields if your API returns pagination, etc.
}