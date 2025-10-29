import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {Toaster} from 'react-hot-toast'
import Blog from './pages/blog/Blog'
import Community from './pages/community/Community'
import GenerateImage from './pages/generateImages/generateImage'
import RemoveBackground from './pages/removeBackground/removeBackground'
import RemoveObject from './pages/removeObject/removeObject'
import ReviewResume from './pages/reviewResume/reviewResume'
import WriteArtical from './pages/writeArtical/WriteArtical'
import Layout from './pages/layout/layout'
import Home from './pages/home/home'
import Dashboarde from './pages/dashboard/Dashboarde'

const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={<Home/>} />
      
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboarde />} />
        <Route path='blog-titles' element={<Blog/>} />
        <Route path='community' element={<Community />} />
        <Route path='generate-images' element={<GenerateImage/>} />
        <Route path='remove-background' element={<RemoveBackground />} />
        <Route path='remove-object' element={<RemoveObject />} />
        <Route path='review-resume' element={<ReviewResume />} />
        <Route path='write-article' element={<WriteArtical />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
