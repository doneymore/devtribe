import { getAllActivities } from "@/app/lib/blogServices";
import React from "react";
import ScrollingCarousel from "./latest";


interface CarouselSection {
  title: string;
  description?: string;
  link: string;
  images: {
    imageUrl: string;
    imageAlt: string;
    link: string;
  }[];
}

// Helper function to ensure base64 string has proper data URI prefix
const formatBase64Image = (base64String: string): string => {
  if (!base64String) return "";
  
  // If it already has data URI prefix, return as is
  if (base64String.startsWith("data:image")) {
    return base64String;
  }
  
  // Add data URI prefix - assuming JPEG, but could be PNG
  // You might want to detect the image type or use a default
  return `data:image/jpeg;base64,${base64String}`;
};

const LatestCarousel = async () => {
  let carouselSections: CarouselSection[] = [];

  try {
    const response = await getAllActivities(1);

    if (response.result === 1 && response.payload) {
      carouselSections = response.payload.map((activity) => {
        // Collect all non-null images from the images object
        const images = [];
        
        if (activity.images?.image1) {
          images.push({
            imageUrl: formatBase64Image(activity.images.image1),
            imageAlt: `${activity.title} - Image 1`,
            link: `/activities/${activity.id}`,
          });
        }
        
        if (activity.images?.image2) {
          images.push({
            imageUrl: formatBase64Image(activity.images.image2),
            imageAlt: `${activity.title} - Image 2`,
            link: `/activities/${activity.id}`,
          });
        }
        
        if (activity.images?.image3) {
          images.push({
            imageUrl: formatBase64Image(activity.images.image3),
            imageAlt: `${activity.title} - Image 3`,
            link: `/activities/${activity.id}`,
          });
        }

        // Check if imageUrl field exists and add it
        if (activity.imageUrl) {
          images.push({
            imageUrl: formatBase64Image(activity.imageUrl),
            imageAlt: activity.title,
            link: `/activities/${activity.id}`,
          });
        }

        // If no images, add a placeholder that will show an icon
        if (images.length === 0) {
          images.push({
            imageUrl: "", // Empty string will trigger icon display
            imageAlt: activity.title,
            link: `/activities/${activity.id}`,
          });
        }

        return {
          title: activity.title,
          description: activity.description,
          link: `/activities/${activity.id}`,
          images: images,
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch activities for carousel:", error);
  }

  // Only render if we have data from the endpoint
  if (carouselSections.length === 0) {
    return null;
  }

  return (
    <ScrollingCarousel
      title="Our Latest Activities"
      sections={carouselSections}
      sectionsPerPage={3}
      autoScrollInterval={4000}
      backgroundColor="bg-gray-200"
      showTitle={true}
      titleAlignment="center"
    />
  );
};

export default LatestCarousel;