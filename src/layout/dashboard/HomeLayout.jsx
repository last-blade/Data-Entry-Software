import React from 'react'
import SideBar from './SideBar'

function HomeLayout({children}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      {children}
    </div>
  )
}

export default HomeLayout