const API_BASE_URL = "https://secneedles-vn55-v1.onrender.com/api/User";

export interface Role {
  roleId: number;
  roleName: string;
  description: string | null;
  createdAt: string;
}

export interface User {
  dateCreated: string;
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  phoneNumber: string;
  emailAddress: string;
  aboutMeText: string;
  professionalTitle: string | null;
  lastLoggedId: string;
  isActive: boolean;
  role: Role;
}

export interface UserResponse {
  payload: User[];
  totalCount: number;
  isExistingUser: boolean;
  code: number;
  description: string | null;
  result: number;
  thirdPartyAPIResponseCode: number;
  thirdPartyAPIResult: string | null;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/getallusers`, {
      cache: "no-store", // Force SSR on every request
      // Alternative for ISR (Incremental Static Regeneration):
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserResponse = await response.json();

    // Check if the request was successful and return the payload
    if (data.result === 1 && data.payload) {
      return data.payload;
    }

    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserByUserId(userId: string): Promise<User | null> {
  try {
    const users = await getAllUsers();
    const user = users.find(
      (u) => u.userId.toLowerCase() === userId.toLowerCase()
    );
    return user || null;
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    return null;
  }
}

// Helper function to get full name
export function getFullName(user: User): string {
  const parts = [user.firstName, user.otherName, user.lastName].filter(Boolean);
  return parts.join(" ");
}

// Helper function to get professional title or fallback
export function getProfessionalTitle(user: User): string {
  return user.professionalTitle || user.role.roleName || "Professional";
}
