import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthIndex from "./auth"
import FrontendIndex from "./frontend"
import { useAuthContext } from '../context/authContext'
export default function Index() {
  const {isAuthenticated} = useAuthContext()
  return (
    <Routes>
    <Route path='/*' element={<FrontendIndex/>} />
      <Route path='auth/*' element={!isAuthenticated? <AuthIndex/>: <Navigate to="/" />}  />
    </Routes>
  )
}
