export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export const samplePosts: BlogPost[] = [
 
  // Fixed: Using deterministic values instead of Math.random()
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 2,
    title: `Other post heading sample text for blog page design lorem 30 lorem 50 lorem 13 ${i + 2}`,
    author: i % 2 === 0 ? "Jane Smith" : "Alex Johnson",
    date: `Jan ${16 + i}, 2025`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "/api/placeholder/432/192",
    likes: ((i * 3 + 5) % 50) + 1, // Deterministic likes count
    comments: ((i * 2 + 1) % 20) + 1, // Deterministic comments count
    isLiked: false,
  })),
];

// types/blogDetail.ts
export interface BlogDetailPost {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  likes: number;
  isLiked: boolean;
}

export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export const samplePostCard: BlogDetailPost = {
  id: 1,
  title: "Latest post heading sample text for blog page design and development",
  content: "",
  imageUrl: "/api/placeholder/1215/595",
  author: {
    name: "John Doe",
    avatar: "/api/placeholder/48/48",
  },
  publishedDate: "January 24, 2025",
  likes: 24,
  isLiked: false,
};

export const sampleComments: Comment[] = [
  {
    id: 1,
    author: {
      name: "Jane Smith",
      avatar: "/api/placeholder/40/40",
    },
    content: "This is a great article! Thanks for sharing these insights.",
    timestamp: "2 hours ago",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 1,
        author: {
          name: "John Doe",
          avatar: "/api/placeholder/32/32",
        },
        content: "Thank you for the feedback! Glad you found it helpful.",
        timestamp: "1 hour ago",
        likes: 2,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Alex Johnson",
      avatar: "/api/placeholder/40/40",
    },
    content:
      "Very informative post. Looking forward to more content like this.",
    timestamp: "4 hours ago",
    likes: 8,
    isLiked: true,
    replies: [],
  },
];
