const API_BASE_URL = "https://secneedles-vn55-v1.onrender.com/api";

export interface BlogComment {
  blogId: number;
  comment: string;
  emailAddress: string;
}

export interface CreateOrLoginUserRequest {
  emailAddress: string;
  fullName: string;
  jwtToken: string;
}

export interface CreateOrLoginUserApiResponse {
  result: number;
  code: number;
  description: string | null;
  isExistingUser: boolean;
  totalCount: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
  payload: BlogUserPayload;
}

export interface BlogUserPayload {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  emailAddress: string;
  phoneNumber: string | null;
  professionalTitle: string | null;
  aboutMeText: string | null;
  userImage: string | null;
  fullName: string | null;

  roleId: number;
  isActive: boolean;
  isBlockedUntil: string | null;

  dateCreated: string;
  lastLoggedIn: string | null;
  dateOfBirth: string | null;

  passwordHash: string; // usually not needed on FE, but included for accuracy
}

export interface BlogPost {
  blogId: number;
  blogTItle: string;
  blogBody: string;
  likes: number;
  dateCreated: string;
  createdBy: string;
  blogImage: string | null;
  updatedBy: string | null;
  dateUpdated: string | null;
  comments: BlogComment[];
  thumnailImage: string | null;
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

export interface LikeUnlikeResponse {
  result: number;
  message?: string;
  payload?: unknown;
}

export interface CreateCommentRequest {
  blogId: number;
  comment: string;
  emailAddress: string;
}

export interface CreateCommentResponse {
  result: number;
  message?: string;
  payload?: BlogComment;
}

export interface VideoStream {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  youtubeStreamId: string | null;
  scheduledStartTime: string;
  actualStartTime: string;
  endTime: string;
  thumbnailUrl: string;
  status: "completed" | "upcoming" | "live";
  dateCreated: string;
}

export interface VideoStreamsResponse {
  payload: VideoStream[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export interface SystemSettings {
  settingsId: number;
  appName: string;
  logo: string;
  phoneNumber: string;
  emailAddress: string;
  createdBy: string;
  dateCreated: string;
  dateUpdated: string | null;
  updatedBy: string;
  whoWeAre: string;
  whereWeAreHeaded: string;
  teamMembers: string;
}

export interface Service {
  id: number;
  settingsId: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  systemSettings: SystemSettings;
}

export interface ServicesResponse {
  payload: Service[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

// Fetch all services
export async function getAllServices(
  settingsId: number = 1
): Promise<ServicesResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Admin/GetAllServices/${settingsId}`,
      {
        cache: "no-store",
        next: { revalidate: 3600 }, // Revalidate every hour (services don't change often)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function getAllLiveStreams(): Promise<VideoStreamsResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/VideoStream/GetAllLiveStreams`,
      {
        cache: "no-store", // Important for Server Components
        next: { revalidate: 0 }, // Disable caching for real-time data
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching video streams:", error);
    throw error;
  }
}

export async function getAllBlogPosts(): Promise<AllBlogPostsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/Blog/GetAllBlogPost`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/Blog/GetBlogPostById/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BlogPostResponse = await response.json();

    if (data.result === 1 && data.payload) {
      return data.payload;
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function createOrLoginUser(user: {
  email: string;
  name: string;
  token: string;
}): Promise<CreateOrLoginUserApiResponse | null> {
  try {
    const requestBody: CreateOrLoginUserRequest = {
      emailAddress: user.email,
      fullName: user.name,
      jwtToken: user.token,
    };

    const response = await fetch(
      `${API_BASE_URL}/GoogleAuth/CreateOrLoginUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CreateOrLoginUserApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating/logging in user:", error);
    return null;
  }
}

export async function likeBlogPost(
  postId: number,
  userId: string
): Promise<LikeUnlikeResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Blog/LikeBlogPost/${postId}/like?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LikeUnlikeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error liking blog post:", error);
    return { result: 0, message: "Failed to like post" };
  }
}

export async function unlikeBlogPost(
  postId: number,
  userId: string
): Promise<LikeUnlikeResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Blog/UnlikeBlogPost/${postId}/unlike?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LikeUnlikeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error unliking blog post:", error);
    return { result: 0, message: "Failed to unlike post" };
  }
}

export async function createBlogComment(
  commentData: CreateCommentRequest
): Promise<CreateCommentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/Blog/CreateBlogComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CreateCommentResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating blog comment:", error);
    return { result: 0, message: "Failed to create comment" };
  }
}
