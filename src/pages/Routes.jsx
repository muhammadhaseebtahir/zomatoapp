import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthIndex from "./auth"
import FrontendIndex from "./frontend"
export default function Index() {
  return (
    <Routes>
    <Route path='/*' element={<FrontendIndex/>} />
      <Route path='auth/*' element={<AuthIndex/>}  />
    </Routes>
  )
}
