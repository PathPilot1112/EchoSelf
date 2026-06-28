import React from 'react' 
import Hero from './components/Hero'
import Preview_Section from './components/Preview_Section'
import Info_Section from './components/Info_Section'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Hero/>
      <Preview_Section/>
      <Info_Section/>
      <Footer/>
    </div>
  )
}

export default App