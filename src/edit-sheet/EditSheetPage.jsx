"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Menu, Save, Plus, ChevronLeft } from "lucide-react"

import { Button } from "../components/Button"
import { Sidebar } from "../layout/dashboard/SideBar"
import { Input } from "../components/Input" 
export default function EditSheetPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Get sheet configuration from URL params
  const sheetName = searchParams.get("name") || "Untitled Sheet"
  const initialRows = Number.parseInt(searchParams.get("rows")) || 10
  const initialColumns = Number.parseInt(searchParams.get("columns")) || 10

  // State for sheet data
  const [data, setData] = useState([])
  const [rowCount, setRowCount] = useState(initialRows)
  const [columnCount, setColumnCount] = useState(initialColumns)
  const sheetContainerRef = useRef(null)

  // Generate column headers (A, B, C, etc.)
  const columns = Array.from({ length: columnCount }, (_, i) => {
    return {
      id: i,
      name: String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : ""),
    }
  })

  // Initialize empty data grid
  useEffect(() => {
    const initialData = Array.from({ length: rowCount }, (_, rowIndex) => {
      const rowData = { id: rowIndex }
      columns.forEach((col) => {
        rowData[col.name] = ""
      })
      return rowData
    })

    setData(initialData)
  }, [rowCount, columnCount])

  const handleCellChange = (rowIndex, colName, value) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[rowIndex] = {
        ...newData[rowIndex],
        [colName]: value,
      }
      return newData
    })
  }

  const handleAddRow = () => {
    const newRowIndex = rowCount
    const newRow = { id: newRowIndex }

    columns.forEach((col) => {
      newRow[col.name] = ""
    })

    setData((prevData) => [...prevData, newRow])
    setRowCount((prevCount) => prevCount + 1)
  }

  const handleAddColumn = () => {
    const newColIndex = columnCount
    const newColName =
      String.fromCharCode(65 + (newColIndex % 26)) + (newColIndex >= 26 ? Math.floor(newColIndex / 26) : "")

    setData((prevData) => {
      return prevData.map((row) => ({
        ...row,
        [newColName]: "",
      }))
    })

    setColumnCount((prevCount) => prevCount + 1)
  }

  const handleSave = () => {
    setIsSaving(true)

    // In a real app, you would save the sheet data to your database
    setTimeout(() => {
      setIsSaving(false)
      alert("Sheet saved successfully!")
      router.push("/")
    }, 1000)
  }

  const handleBack = () => {
    if (confirm("Are you sure you want to go back? Any unsaved changes will be lost.")) {
      router.push("/")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="flex items-center h-16 px-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold truncate">{sheetName}</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={handleAddRow} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Row
            </Button>
            <Button variant="outline" onClick={handleAddColumn} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Column
            </Button>
            <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Sheet"}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Sheet container with custom scrolling */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={sheetContainerRef}
            className="h-full overflow-auto"
            style={{
              maxHeight: "calc(100vh - 4rem)",
              width: "100%",
            }}
          >
            <div className="min-w-max">
              {/* Column headers */}
              <div className="sticky top-0 z-10 flex bg-gray-100 border-b">
                <div className="w-12 shrink-0 border-r bg-gray-200 flex items-center justify-center font-medium">#</div>
                {columns.map((column) => (
                  <div key={column.id} className="w-32 shrink-0 border-r py-2 px-3 font-medium text-center">
                    {column.name}
                  </div>
                ))}
              </div>

              {/* Editable rows */}
              <div>
                {data.map((row) => (
                  <div key={row.id} className="flex border-b hover:bg-gray-50">
                    <div className="w-12 shrink-0 border-r bg-gray-100 flex items-center justify-center text-sm text-gray-500 sticky left-0">
                      {row.id + 1}
                    </div>
                    {columns.map((column) => (
                      <div key={`${row.id}-${column.id}`} className="w-32 shrink-0 border-r p-0">
                        <Input
                          value={row[column.name] || ""}
                          onChange={(e) => handleCellChange(row.id, column.name, e.target.value)}
                          className="border-0 h-9 rounded-none focus:ring-0 focus:ring-offset-0"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

