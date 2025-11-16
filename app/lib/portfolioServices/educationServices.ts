const API_BASE_URL = 'https://secneedles-webapi.onrender.com/api/Portfolio';

export interface Education {
  educationId: string;
  userId: string;
  title: string;
  institutionName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface EducationResponse {
  payload: Education[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export async function getEducationByUserId(userId: string): Promise<Education[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/GetEducationByUserId/${userId}`, {
      cache: 'no-store', // Force SSR on every request
      // Alternative for ISR (Incremental Static Regeneration):
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: EducationResponse = await response.json();
    
    // Check if the request was successful and return the payload
    if (data.result === 1 && data.payload) {
      return data.payload;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching education data:', error);
    return [];
  }
}

// Helper function to format date for display
export function formatEducationYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

// Helper function to format date range
export function formatEducationPeriod(startDate: string, endDate: string): string {
  const start = new Date(startDate).getFullYear();
  const end = new Date(endDate).getFullYear();
  return `${start} - ${end}`;
}