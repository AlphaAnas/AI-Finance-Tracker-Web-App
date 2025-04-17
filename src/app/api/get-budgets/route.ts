import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/app/firebase"
import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

interface Budget extends DocumentData {
  id: string
  userId: string
  // Add other fields here if known, for stronger typing
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const uid = searchParams.get("uid")

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Add logging to debug
    console.log("Fetching budgets for user:", uid)
    
    const budgetsRef = collection(db, "budgets")
    const q = query(budgetsRef, where("userId", "==", uid))
    
    const querySnapshot = await getDocs(q)
    console.log("Query results count:", querySnapshot.size)

    const budgets: Budget[] = []
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      budgets.push({
        id: doc.id,
        ...doc.data(),
      } as Budget)
    })

    // Log the response being sent
    console.log("Returning budgets:", budgets)
    
    // Make sure the response has the correct headers
    return NextResponse.json(budgets, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    // Enhanced error logging
    console.error("Error fetching budgets:", error)
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: "Failed to fetch budgets", 
        message: error instanceof Error ? error.message : String(error) 
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        } 
      }
    )
  }
}