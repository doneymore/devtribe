// lib/api/conferences.ts

const API_BASE_URL = 'https://secneedles-vn55-v1.onrender.com/api/Portfolio';
const USER_ID = 'C5C676ED-F6C0-4A1E-B4A8-35918F866548';

export interface Conference {
  conferenceId: string;
  title: string;
  description: string;
  yearAttended: number;
  logoImageBase64: string | null;
  dateCreated: string;
}

export interface ConferencesResponse {
  payload: Conference[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export async function getConferencesByUserId(userId: string = USER_ID): Promise<ConferencesResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/GetConferencesByUserId/${userId}`,
      {
        cache: 'no-store', // Force SSR on every request
        // Alternative for ISR (Incremental Static Regeneration):
        // next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ConferencesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }
}

export async function getConferencesPayload(userId: string = USER_ID): Promise<Conference[]> {
  try {
    const response = await getConferencesByUserId(userId);
    
    // Check if the request was successful and return the payload
    if (response.result === 1 && response.payload) {
      return response.payload;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching conferences payload:', error);
    return [];
  }
}