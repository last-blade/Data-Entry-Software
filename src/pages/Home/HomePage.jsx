"use client"

import { useState } from "react"
import { SheetIcon as Sheets, Star, LogOut, Plus, User } from "lucide-react"

import { Button } from "../../components/Button"
import { Card, CardContent } from "../../components/Card"
import { Separator } from "../../components/Separator"
import { Sheet } from "../../components/Sheet"
import { CreateSheetDialog } from "../../components/CreateSheetDialog"

// Mock data for demonstration
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

  // Filter sheets based on starred status if showStarred is true
  const filteredSheets = showStarred ? mockSheets.filter((sheet) => sheet.starred) : mockSheets

  // Get only the first 3 sheets for the sidebar
  const sidebarSheets = mockSheets.slice(0, 3)

  const handleLogout = () => {

  }

  const handleCreateSheet = () => {
    document.getElementById("create-sheet-dialog").showModal()
  }

  const handleSheetClick = (sheetId) => {
    router.push(`/view-sheet/${sheetId}`)
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold">Data Entry App</h1>
          </div>

          <div className="p-4 flex-1">
            {/* User info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">{mockSheets.length} sheets</p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Create new sheet button */}
            <Button className="w-full mb-6 gap-2" size="sm" onClick={handleCreateSheet}>
              <Plus size={16} />
              Create New Sheet
            </Button>

            {/* Sheet filters */}
            <div className="space-y-1 mb-4">
              <Button
                variant={!showStarred ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setShowStarred(false)}
              >
                <Sheets className="mr-2 h-4 w-4" />
                All Sheets
              </Button>
              <Button
                variant={showStarred ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setShowStarred(true)}
              >
                <Star className="mr-2 h-4 w-4" />
                Starred Sheets
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Recent sheets in sidebar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Recent Sheets</h3>
                <Button variant="link" size="sm" className="h-auto p-0">
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {sidebarSheets.map((sheet) => (
                  <div key={sheet.id} className="text-sm truncate">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto"
                      onClick={() => handleSheetClick(sheet.id)}
                    >
                      <span className="truncate">{sheet.name}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{showStarred ? "Starred Sheets" : "Recent Sheets"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSheets.map((sheet) => (
                <div key={sheet.id} onClick={() => handleSheetClick(sheet.id)}>
                  <Sheet id={sheet.id} name={sheet.name} lastEdited={sheet.lastEdited} starred={sheet.starred} />
                </div>
              ))}
            </div>

            {filteredSheets.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Sheets className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No sheets found</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    {showStarred ? "You haven't starred any sheets yet." : "You haven't created any sheets yet."}
                  </p>
                  <Button className="mt-4 gap-2" onClick={handleCreateSheet}>
                    <Plus size={16} />
                    Create New Sheet
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Create Sheet Dialog */}
      <CreateSheetDialog />
    </>
  )
}

