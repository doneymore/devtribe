// import { blog, blog_post, blog_right, blog_story } from "@/public/assests/image";
// import { StaticImageData } from "next/image";

// export interface BlogPost {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   description: string;
//   imageUrl: string | StaticImageData;
//   likes: number;
//   comments: number;
//   isLiked?: boolean;
//   slug?: string; // Add this optional slug property
// }

// export interface FeaturedPost {
//   id: string;
//   image: string;
//   imageAlt: string;
//   title: string;
//   author: string;
//   date: string;
//   excerpt: string;
//   slug: string;
// }

// export interface BlogDetailPost {
//   id: number;
//   title: string;
//   content: string;
//   imageUrl: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   publishedDate: string;
//   likes: number;
//   isLiked: boolean;
// }

// export interface Comment {
//   id: number;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   content: string;
//   timestamp: string;
//   likes: number;
//   isLiked: boolean;
//   replies: Reply[];
// }

// export interface Reply {
//   id: number;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   content: string;
//   timestamp: string;
//   likes: number;
//   isLiked: boolean;
// }
// const blogImages = [blog, blog_post, blog_right, blog_story];
// // Mock data
// const mockBlogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "Understanding React Server Components in Modern Development",
//     author: "John Doe",
//     date: "Jan 15, 2025",
//     description:
//       "A comprehensive guide to React Server Components and their benefits in modern web development applications.",
//     imageUrl: "/images/blog/react-server.jpg",
//     likes: 42,
//     comments: 8,
//     isLiked: false,
//   },
//   {
//     id: 2,
//     title: "Next.js 14 Features Deep Dive and Performance Tips",
//     author: "Jane Smith",
//     date: "Jan 18, 2025",
//     description:
//       "Exploring the latest features in Next.js 14 including improved routing and performance optimizations.",
//     imageUrl: "/images/blog/nextjs-features.jpg",
//     likes: 38,
//     comments: 12,
//     isLiked: false,
//   },
//   {
//     id: 3,
//     title: "Building Scalable Applications with TypeScript",
//     author: "Alex Johnson",
//     date: "Jan 20, 2025",
//     description:
//       "Learn how to build maintainable and scalable web applications using TypeScript with React.",
//     imageUrl: "/images/blog/typescript-guide.jpg",
//     likes: 56,
//     comments: 15,
//     isLiked: true,
//   },
//   // Add more posts...
//   ...Array.from({ length: 15 }, (_, i) => ({
//     id: i + 4,
//     title: `Blog Post Title ${i + 4} - Sample Content`,
//     author: i % 2 === 0 ? "Sarah Wilson" : "Mike Chen",
//     date: `Jan ${22 + i}, 2025`,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     imageUrl: (blogImages[i % blogImages.length] as { src: string }).src,
//     likes: ((i * 3 + 5) % 50) + 1,
//     comments: ((i * 2 + 1) % 20) + 1,
//     isLiked: false,
//   })),
// ];

// const mockComments: { [key: string]: Comment[] } = {
//   "1": [
//     {
//       id: 101,
//       author: {
//         name: "Mike Chen",
//         avatar: "/images/avatars/mike.jpg",
//       },
//       content:
//         "Excellent explanation of Server Components! This really helped clarify the concept for me.",
//       timestamp: "2 hours ago",
//       likes: 8,
//       isLiked: false,
//       replies: [
//         {
//           id: 1001,
//           author: {
//             name: "John Doe",
//             avatar: "/images/avatars/john.jpg",
//           },
//           content: "Thanks Mike! I'm glad it was helpful.",
//           timestamp: "1 hour ago",
//           likes: 3,
//           isLiked: false,
//         },
//       ],
//     },
//   ],
//   "2": [
//     {
//       id: 201,
//       author: {
//         name: "Emily Davis",
//         avatar: "/images/avatars/emily.jpg",
//       },
//       content:
//         "Great overview of Next.js 14! The performance improvements are impressive.",
//       timestamp: "3 hours ago",
//       likes: 12,
//       isLiked: true,
//       replies: [],
//     },
//   ],
// };

// export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 100));
//   return mockBlogPosts;
// };

// export const getFeaturedPost = async (): Promise<FeaturedPost> => {
//   await new Promise((resolve) => setTimeout(resolve, 100));
//   return {
//     id: "featured-1",
//     image: "/images/blog/featured-post.jpg",
//     imageAlt: "Featured blog post illustration",
//     title: "Latest post heading sample text for modern web development",
//     author: "Writer Name",
//     date: "23 Dec",
//     excerpt:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     slug: "latest-post-heading-sample",
//   };
// };

// export const getBlogPostById = async (
//   id: string
// ): Promise<BlogDetailPost | null> => {
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   // Convert string id to number for comparison
//   const numericId = parseInt(id, 10);
//   const post = mockBlogPosts.find((p) => p.id === numericId);

//   if (!post) return null;

//   return {
//     id: post.id,
//     title: post.title,
//     content: post.description,
//     imageUrl: typeof post.imageUrl === "string" ? post.imageUrl : post.imageUrl.src,
//     author: {
//       name: post.author,
//       avatar: "/images/avatars/default.jpg",
//     },
//     publishedDate: post.date,
//     likes: post.likes,
//     isLiked: post.isLiked || false,
//   };
// };

// export const getCommentsByPostId = async (
//   postId: string
// ): Promise<Comment[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 100));
//   return mockComments[postId] || [];
// };
