"use client"

import { useState } from "react"
import { SheetIcon as Sheets, Star, LogOut, Plus, User } from 'lucide-react'

import { Button } from "../../components/Button"
import { Card, CardContent } from "../../components/Card"

import { Sheet } from "../../components/Sheet"

const mockSheets = [
  { id: 1, name: "Sales Report Q1", lastEdited: "2 hours ago", starred: true },
  { id: 2, name: "Employee Data", lastEdited: "Yesterday", starred: false },
  { id: 3, name: "Inventory 2024", lastEdited: "3 days ago", starred: true },
  { id: 4, name: "Marketing Budget", lastEdited: "1 week ago", starred: false },
  { id: 5, name: "Customer Feedback", lastEdited: "2 weeks ago", starred: false },
  { id: 6, name: "Project Timeline", lastEdited: "3 weeks ago", starred: true },
]

export default function HomePage() {
    const [showStarred, setShowStarred] = useState(false)
  const filteredSheets = showStarred 
    ? mockSheets.filter(sheet => sheet.starred) 
    : mockSheets

  return (
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {showStarred ? "Starred Sheets" : "Recent Sheets"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSheets.map(sheet => (
              <Sheet 
                key={sheet.id}
                id={sheet.id}
                name={sheet.name}
                lastEdited={sheet.lastEdited}
                starred={sheet.starred}
              />
            ))}
          </div>
          
          {filteredSheets.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Sheets className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No sheets found</h3>
                <p className="text-muted-foreground text-center mt-2">
                  {showStarred 
                    ? "You haven't starred any sheets yet." 
                    : "You haven't created any sheets yet."}
                </p>
                <Button className="mt-4 gap-2">
                  <Plus size={16} />
                  Create New Sheet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
  )
}
