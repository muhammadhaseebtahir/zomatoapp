import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home'
import Blog from './blog'
import Header from '../../component/header'


export default function Index() {
  return (
    <>
{/* <Header/> */}
    <main>

    <Routes>
      <Route index   element={<Home/>} />
      <Route path="/blog" element={<Blog/>} />
    </Routes>
    </main>
    </>
  )
}
