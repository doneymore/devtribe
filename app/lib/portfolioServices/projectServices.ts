// lib/api/projects.ts

const API_BASE_URL = 'https://secneedles-vn55-v1.onrender.com/api/Portfolio';
const USER_ID = 'C5C676ED-F6C0-4A1E-B4A8-35918F866548';

export interface Project {
  projectId: number;
  title: string;
  description: string;
  projectUrl?: string; // Optional URL field for linking to projects
  imageSrc?: string; // Optional image field
}

export interface ProjectsResponse {
  payload: Project[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export async function getUserProjects(userId: string = USER_ID): Promise<ProjectsResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/GetUserProject?userId=${userId}`,
      {
        cache: 'no-store', // Force SSR on every request
        // Alternative for ISR (Incremental Static Regeneration):
        // next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
}

export async function getProjectsPayload(userId: string = USER_ID): Promise<Project[]> {
  try {
    const response = await getUserProjects(userId);
    
    // Check if the request was successful and return the payload
    if (response.result === 1 && response.payload) {
      return response.payload;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching projects payload:', error);
    return [];
  }
}