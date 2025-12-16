import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://secneedles-vn3-latest.onrender.com/api/Blog";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAllBlogPost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch blog posts" },
        { status: response.status }
      );
    }
    debugger;
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
