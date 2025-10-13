import React from 'react'
import NavBar from '../../components/core/NavBar'
import Hero from '../../components/core/Hero'
import AiTool from '../../components/core/aiTool'
import { Testimonial } from '../../components/Testimonial'
import testimonials from '../../data/Testimonial'
import people from "../../data/people"
import words from '../../data/word'
import Plan from '../../components/core/Plan'
import Footer from '../../components/core/footer'

function Home() {
  return (
    <>
      <NavBar />
      <Hero people={people} words={words} />
      <AiTool/>
      <Testimonial testimonials={testimonials} />
      <Plan />
      <Footer />
    </>
  )
}

export default Home