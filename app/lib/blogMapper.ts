import { formatBlogDate } from "@/app/utils/dateformatter";
import { createExcerpt } from "@/app/utils/createExcerptOfImage";
import { getImageSrc } from "@/app/utils/convertBase64toImage";
import { blog_post } from "@/public/assests/image";
import { BlogPost, UIBlogPost } from "../types";

export function mapBlogPostToUI(post: BlogPost): UIBlogPost {
  return {
    id: post.blogId,
    title: post.blogTItle,
    description: createExcerpt(post.blogBody, 150),
    author: post.createdBy,
    date: formatBlogDate(post.dateCreated),
    image: getImageSrc(post.thumnailImage ?? null) ?? blog_post,
    slug: post.blogId.toString(),
    likes: post.likes ?? 0,
    comments: post.comments?.length ?? 0,
    isLiked: post.hasCurrentuserLiked ?? false,
    hasCurrentuserLiked: post.hasCurrentuserLiked ?? false,
  };
}
