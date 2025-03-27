"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { ViewSheet } from "../components/ViewSheet"

// Mock data for demonstration
const mockSheets = [
  { id: 1, name: "Sales Report Q1", lastEdited: "2 hours ago", starred: true },
  { id: 2, name: "Employee Data", lastEdited: "Yesterday", starred: false },
  { id: 3, name: "Inventory 2024", lastEdited: "3 days ago", starred: true },
  { id: 4, name: "Marketing Budget", lastEdited: "1 week ago", starred: false },
  { id: 5, name: "Customer Feedback", lastEdited: "2 weeks ago", starred: false },
  { id: 6, name: "Project Timeline", lastEdited: "3 weeks ago", starred: true },
]

export default function ViewSheetPage() {
  const params = useParams()
  const [sheet, setSheet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the sheet data from your API
    const sheetId = Number.parseInt(params.id)
    const foundSheet = mockSheets.find((s) => s.id === sheetId)

    // Simulate API delay
    setTimeout(() => {
      setSheet(foundSheet || { id: sheetId, name: "Unknown Sheet" })
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading sheet...</p>
        </div>
      </div>
    )
  }

  return <ViewSheet sheet={sheet} />
}

