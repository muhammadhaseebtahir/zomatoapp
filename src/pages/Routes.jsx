import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthIndex from "./auth"
export default function Index() {
  return (
    <Routes>
      <Route path='auth/*' element={<AuthIndex/>}  />
    </Routes>
  )
}
