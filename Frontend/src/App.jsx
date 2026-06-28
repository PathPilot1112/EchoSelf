import React from 'react' 
import { Routes, Route } from "react-router";
import Homepage from './components/Homepage';
import LoadingPage from './components/LoadingPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/loading' element={<LoadingPage/>}/>
      </Routes>
    </div>
  )
}

export default App