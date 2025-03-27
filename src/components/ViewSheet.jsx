"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, Download, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "../components/Button"
import { Sidebar } from "../layout/dashboard/SideBar"

export function ViewSheet({ sheet }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const sheetContainerRef = useRef(null)

  // Mock data generation for demonstration
  useEffect(() => {
    // Generate column headers (A, B, C, etc.)
    const cols = Array.from({ length: 50 }, (_, i) => {
      const colName = String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : "")
      return { id: i, name: colName }
    })

    // Generate rows of data
    const rows = Array.from({ length: 1000 }, (_, rowIndex) => {
      const rowData = { id: rowIndex }
      cols.forEach((col, colIndex) => {
        rowData[col.name] = `Cell ${col.name}${rowIndex + 1}`
      })
      return rowData
    })

    setColumns(cols)
    setData(rows)
  }, [])

  const handleDownload = () => {
    // In a real app, this would generate and download an Excel file
    alert("Downloading Excel file...")
  }

  const handleBack = () => {
    router.push("/")
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
            <h1 className="text-xl font-bold truncate">{sheet?.name || "Sheet Viewer"}</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download Excel
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

              {/* Rows */}
              <div>
                {data.map((row) => (
                  <div key={row.id} className="flex border-b hover:bg-gray-50">
                    <div className="w-12 shrink-0 border-r bg-gray-100 flex items-center justify-center text-sm text-gray-500 sticky left-0">
                      {row.id + 1}
                    </div>
                    {columns.map((column) => (
                      <div key={`${row.id}-${column.id}`} className="w-32 shrink-0 border-r py-1.5 px-3 text-sm">
                        {row[column.name]}
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

