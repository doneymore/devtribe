import { StaticImageData } from "next/image";
export interface BlogPost {
  blogId: number;
  blogTItle: string;
  blogBody: string;
  createdBy: string;
  dateCreated: string;
  thumnailImage?: string | null;
  likes?: number;
  comments?: unknown[];
  hasCurrentuserLiked?: boolean;
}

export interface AllBlogPostsResponse {
  payload: BlogPost[];
}

export interface UIBlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string | StaticImageData;
  slug: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  hasCurrentuserLiked: boolean;
}
