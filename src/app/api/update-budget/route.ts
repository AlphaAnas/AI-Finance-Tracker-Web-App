import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/app/firebase"
import { doc, updateDoc } from "firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, spent, allocated } = data

    if (!id) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 })
    }

    // Update the budget document
    const budgetRef = doc(db, "budgets", id)

    const updateData: any = {}
    if (spent !== undefined) updateData.spent = spent
    if (allocated !== undefined) updateData.allocated = allocated

    await updateDoc(budgetRef, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating budget:", error)
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 })
  }
}
