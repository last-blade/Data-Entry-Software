"use client"

import { useState } from "react"
import { FileSpreadsheet, Star, MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardFooter } from "../components/Card"
import { Button } from "../components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/DropDownMenu"

export function Sheet({ id, name, lastEdited, starred }) {
  const [isStarred, setIsStarred] = useState(starred)

  const toggleStar = (e) => {
    e.stopPropagation()
    setIsStarred(!isStarred)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-6 flex items-center justify-center">
          <FileSpreadsheet className="h-12 w-12 text-primary" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-medium truncate">{name}</h3>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleStar}>
              <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
              <span className="sr-only">{isStarred ? "Unstar" : "Star"} sheet</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Edited {lastEdited}</p>
      </CardFooter>
    </Card>
  )
}

