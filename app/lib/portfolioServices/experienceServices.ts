import { parseJobDutiesServer } from "@/app/utils/htmlTextformatter";
import { formatPeriod } from "@/app/utils/timeFormatter";

// lib/api/experience.ts
const API_BASE_URL = 'https://secneedles-vn55-v1.onrender.com/api/Portfolio';

export interface ExperienceItemAPI {
  id: number;
  userId: string;
  experienceId: string;
  jobTitle: string;
  companyName: string;
  jobDuties: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dateCreated: string;
}

export interface ExperienceItem {
  experienceId: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ExperienceResponse {
  payload: ExperienceItemAPI[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}





// Helper function to transform API data to component format
function transformExperienceData(apiData: ExperienceItemAPI[]): ExperienceItem[] {
  return apiData.map(item => ({
    experienceId: item.experienceId,
    title: item.jobTitle,
    company: item.companyName,
    location: '', // Not provided in API, you can add later
    period: formatPeriod(item.startDate, item.endDate, item.isActive),
     description: parseJobDutiesServer(item.jobDuties),
    startDate: item.startDate,
    endDate: item.endDate,
    isActive: item.isActive,
  }));
}

export async function getExperienceByUserId(userId: string): Promise<ExperienceItem[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/GetExperienceByUserId?userId=${userId}`,
      {
        cache: 'no-store', // Force SSR on every request
        // Alternative for ISR:
        // next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExperienceResponse = await response.json();
    
    // Check if the request was successful and return the transformed payload
    if (data.result === 1 && data.payload) {
      return transformExperienceData(data.payload);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}