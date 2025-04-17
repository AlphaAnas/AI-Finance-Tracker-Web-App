import { NextRequest, NextResponse } from "next/server";
import { getUserData, updateUserData } from "./userDataService";

// GET /api/profile?uid=123
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    if (!uid) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    
    const userData = await getUserData(uid);
    
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ data: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/profile
export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    if (!userData || !userData.uid) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }
    
    await updateUserData(userData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}