import React, { useState } from "react";
import { Separator } from "../../components/Separator"
import { SheetIcon as Sheets, Star, LogOut, Plus, User } from 'lucide-react'
import { Button } from "../../components/Button"
import { useNavigate } from "react-router-dom";

const mockSheets = [
  { id: 1, name: "Sales Report Q1", lastEdited: "2 hours ago", starred: true },
  { id: 2, name: "Employee Data", lastEdited: "Yesterday", starred: false },
  { id: 3, name: "Inventory 2024", lastEdited: "3 days ago", starred: true },
  { id: 4, name: "Marketing Budget", lastEdited: "1 week ago", starred: false },
  { id: 5, name: "Customer Feedback", lastEdited: "2 weeks ago", starred: false },
  { id: 6, name: "Project Timeline", lastEdited: "3 weeks ago", starred: true },
]

function SideBar() {
  const navigate = useNavigate();
  const [showStarred, setShowStarred] = useState(false)
  const sidebarSheets = mockSheets.slice(0, 3)
    const handleLogout = () => {
    // In a real app, you would clear authentication state here
    // router.push("/login")
  }
  return (
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
              <p className="text-sm text-muted-foreground">
                {mockSheets.length} sheets
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Create new sheet button */}
          <Button className="w-full mb-6 gap-2" size="sm">
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
                  >
                    <span className="truncate">{sheet.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <div className="p-4 border-t" onClick={() => navigate("/login")}>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

  );
}

export default SideBar;
