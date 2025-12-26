import React from "react";
import type { Metadata } from "next";
import BlogScreenClient from "./blogScreenWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog - Latest Posts",
  description: "Read our latest blog posts and articles",
  openGraph: {
    title: "Blog - Latest Posts",
    description: "Read our latest blog posts and articles",
    type: "website",
  },
};

export default function BlogScreen() {
  return <BlogScreenClient />;
}
