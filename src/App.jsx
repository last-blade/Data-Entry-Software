import React from 'react'
import HomeLayout from './layout/dashboard/HomeLayout'
import LoginPage from './pages/auth/LoginPage'
import HomePage from './pages/Home/HomePage'

function App() {
  return (
    <div>
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    </div>
  )
}

export default App