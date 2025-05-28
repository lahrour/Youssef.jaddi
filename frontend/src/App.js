"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/HomePage"
import UserListPage from "./components/UserListPage"
import EditUserPage from "./components/EditUserPage"
import "./styles.css"

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.body.classList.toggle("dark-mode", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode)
    document.body.classList.toggle("dark-mode", newDarkMode)
  }

  return (
    <Router>
      <div className="app">
        <nav className={darkMode ? "dark-nav" : "light-nav"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">User List</Link>
            </li>
          </ul>
        </nav>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          <span className="icon">{darkMode ? "☀️" : "🌙"}</span>
          <span className="text">{darkMode ? "Light" : "Dark"}</span>
        </button>
        <div className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/edit-user/:id" element={<EditUserPage />} />
            </Routes>
          </div>
        </div>
        <ToastContainer position="top-right" />
        <footer>
          <p>© 2023 User Management App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

