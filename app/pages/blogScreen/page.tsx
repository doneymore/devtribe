"use client";

import BlogGrid from "@/app/component/reusable/blog/blogCards/blogGrid";
import BlogDetailPage from "@/app/component/reusable/blog/blogDetails/blogdetail";
// import { BlogGrid, BlogPost } from "@/app/component/reusable/blog/blogGrid";
import { BlogCard } from "@/app/component/reusable/blog/blogPost";
import { BlogHeroSection } from "@/app/component/reusable/blog/hero";
import { sampleComments, samplePostCard, samplePosts } from "@/app/component/reusable/blog/types";
import { BlogPost, FeaturedPost, getAllBlogPosts, getBlogPostById, getFeaturedPost } from "@/app/lib/blogSerice";
import { blog_post } from "@/public/assests/image";
import React, { useEffect, useState } from "react";


interface BlogDetailProps {
  params: {
    id: string;
  };
}


const Blog = () => {

 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [featuredPost, setFeaturedPost] = useState<FeaturedPost | null>(null);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const loadData = async () => {
      try {
        const [blogPosts, featured] = await Promise.all([
          getAllBlogPosts(),
          getFeaturedPost(),
        ]);
        setPosts(blogPosts);
        setFeaturedPost(featured);
      } catch (error) {
        console.error("Error loading blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  const samplePost = {
    id: "1",
    image: "", // Dummy image
    imageAlt: "Blog post illustration",
    title: "Latest post heading sample text...",
    author: "Writer Name",
    date: "23 Dec",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    slug: "latest-post-heading-sample",
  };

   
  return (
    <div>
      <BlogHeroSection />

      <BlogCard
        image={blog_post}
        imageAlt={samplePost.imageAlt}
        title={samplePost.title}
        author={samplePost.author}
        date={samplePost.date}
        excerpt={samplePost.excerpt}
        slug={samplePost.slug}
      />
      <BlogGrid posts={samplePosts} itemsPerPage={9} className="mb-8" />

      {/* <Blo gDetailPage post={samplePostCard} comments={sampleComments} /> */}
    </div>
  );
};

export default Blog;


// export async function generateMetadata({ params }: BlogDetailProps) {
//   try {
//     const post = await getBlogPostById(params.id);

//     if (!post) {
//       return {
//         title: "Post Not Found",
//       };
//     }

//     return {
//       title: post.title,
//       description: post.content.substring(0, 150) + "...",
//       openGraph: {
//         title: post.title,
//         description: post.content.substring(0, 150) + "...",
//         images: [post.imageUrl],
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Post Not Found",
//     };
//   }
// }