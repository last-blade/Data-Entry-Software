import React from 'react'
import HomeLayout from './layout/dashboard/HomeLayout'
import LoginPage from './pages/auth/LoginPage'
import HomePage from './pages/Home/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route 
          path="/" 
          element={
            <HomeLayout>
              <HomePage />
            </HomeLayout>
          } 
        />
        <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App