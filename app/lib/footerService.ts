// app/lib/contactUs.ts

const API_BASE_URL = "https://secneedles-vn55-v1.onrender.com/api";

export interface CreateContactUsPayload {
  emailAddress: string;
  firstName: string;
  lastName: string;
  message: string;
}



export async function createContactUs(
  payload: CreateContactUsPayload
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Admin/CreateContactUs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Contact Us error:", error);
    return false;
  }
}
