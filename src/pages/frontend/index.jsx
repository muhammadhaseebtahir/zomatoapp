import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home'
import Blog from './blog'


export default function Index() {
  return (
    <Routes>
      <Route index   element={<Home/>} />
      <Route path="/blog" element={<Blog/>} />
    </Routes>
  )
}
