import React from "react";
import { BlogCard } from "@/app/component/reusable/blog/blogPost";
import { BlogHeroSection } from "@/app/component/reusable/blog/hero";
import BlogGrid from "@/app/component/reusable/blog/blogCards/blogGrid";

import { blog_post } from "@/public/assests/image";
import type { Metadata } from 'next';
import { getAllBlogPosts } from "@/app/lib/blogServices";
import { formatBlogDate } from "@/app/utils/dateformatter";
import { createExcerpt } from "@/app/utils/createExcerptOfImage";
import { getImageSrc } from "@/app/utils/convertBase64toImage";

export const metadata: Metadata = {
  title: 'Blog - Latest Posts',
  description: 'Read our latest blog posts and articles',
  openGraph: {
    title: 'Blog - Latest Posts',
    description: 'Read our latest blog posts and articles',
    type: 'website',
  },
};

// This is now a Server Component (SSR)
export default async function BlogScreen() {
  let postsData: any = null;
  let featuredPost: any = null;
  
  try {
    postsData = await getAllBlogPosts();
    console.log(postsData, "showAllBlogPosts");
    
    // Get the most recent post as featured from the payload
    if (postsData?.payload && Array.isArray(postsData.payload) && postsData.payload.length > 0) {
      featuredPost = postsData.payload[0];
    }
  } catch (error) {
    console.error("Error loading blog data:", error);
  }

  // Normalize posts from the payload
  const normalizedPosts = postsData?.payload && Array.isArray(postsData.payload)
    ? postsData.payload
    : [];
    console.log(normalizedPosts, "normalizedPosts");

  return (
    <div>
      <BlogHeroSection />

      {/* Featured Post */}
      {featuredPost && (
        <BlogCard
          image={getImageSrc(featuredPost.thumnailImage) ?? blog_post}
          imageAlt={featuredPost.blogTItle}
          title={featuredPost.blogTItle}
          author={featuredPost.createdBy}
          date={formatBlogDate(featuredPost.dateCreated)}
          excerpt={createExcerpt(featuredPost.blogBody, 300)}
          slug={featuredPost.blogId.toString()}
        />
      )}

      {/* Blog Grid - Convert posts to format BlogGrid expects */}
      <BlogGrid 
        posts={normalizedPosts.map((post: any) => ({
          id: post.blogId.toString(),
          title: post.blogTItle,
          description: createExcerpt(post.blogBody, 150),
          author: post.createdBy,
          date: formatBlogDate(post.dateCreated),
          image: getImageSrc(post.thumnailImage) ?? blog_post,
          slug: post.blogId.toString(),
          likes: post.likes,
        }))}
        itemsPerPage={9}
        className="mb-8"
      />
    </div>
  );
}