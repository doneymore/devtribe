// types/aboutUs.types.ts

export interface TeamMember {
  name: string;
  title: string;
}

export interface SettingsPayload {
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
  teamMembers: string; // JSON string that needs parsing
}

export interface AboutUsResponse {
  payload: SettingsPayload[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export interface ParsedAboutUsData {
  whoWeAre: string;
  whereWeAreHeaded: string;
  teamMembers: TeamMember[];
  appName: string;
  logo: string;
  phoneNumber: string;
  emailAddress: string;
}

// lib/api/aboutUs.ts

const API_BASE_URL = "https://secneedles-vn55-v1.onrender.com/api/Admin";

export async function getAboutUsSettings(): Promise<AboutUsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/getallsettings`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about us settings:", error);
    throw error;
  }
}

export function parseAboutUsData(response: AboutUsResponse): ParsedAboutUsData | null {
  if (!response.payload || response.payload.length === 0) {
    return null;
  }

  const settings = response.payload[0];
  
  // Parse the teamMembers JSON string
  let teamMembers: TeamMember[] = [];
  try {
    // The teamMembers field appears to be a malformed JSON string
    // We need to wrap it in brackets to make it valid JSON array
    const cleanedTeamMembers = settings.teamMembers.trim();
    const teamMembersArray = JSON.parse(`[${cleanedTeamMembers}]`);
    teamMembers = teamMembersArray;
  } catch (error) {
    console.error("Error parsing team members:", error);
    teamMembers = [];
  }

  return {
    whoWeAre: settings.whoWeAre,
    whereWeAreHeaded: settings.whereWeAreHeaded,
    teamMembers,
    appName: settings.appName,
    logo: settings.logo,
    phoneNumber: settings.phoneNumber,
    emailAddress: settings.emailAddress,
  };
}