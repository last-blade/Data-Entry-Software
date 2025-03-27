"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Label } from "../components/Label"

export function CreateSheetDialog() {
  const router = useRouter()
  const [sheetName, setSheetName] = useState("")
  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    document.getElementById("create-sheet-dialog").close()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate inputs
    if (!sheetName.trim()) {
      alert("Please enter a sheet name")
      setIsLoading(false)
      return
    }

    if (rows < 1 || columns < 1) {
      alert("Rows and columns must be at least 1")
      setIsLoading(false)
      return
    }

    // In a real app, you would create the sheet in your database
    setTimeout(() => {
      setIsLoading(false)
      handleClose()

      // Navigate to the edit sheet page with the configuration
      router.push(`/edit-sheet?name=${encodeURIComponent(sheetName)}&rows=${rows}&columns=${columns}`)
    }, 500)
  }

  return (
    <dialog id="create-sheet-dialog" className="bg-transparent">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-md mx-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Create New Sheet</h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheet-name">Sheet Name</Label>
              <Input
                id="sheet-name"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Enter sheet name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rows">Number of Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  min="1"
                  max="10000"
                  value={rows}
                  onChange={(e) => setRows(Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="columns">Number of Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  min="1"
                  max="100"
                  value={columns}
                  onChange={(e) => setColumns(Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Sheet"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

