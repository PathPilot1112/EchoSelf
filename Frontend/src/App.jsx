import {useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import LoadingPage from './components/LoadingPage';
import ResultPage from './components/ResultPage';
import axios from 'axios';

const App = () => {
    useEffect(() => {
        axios
            .get("https://echoself-ohd4.onrender.com/health")
            .catch(() => {});
    }, []);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/loading' element={<LoadingPage/>}/>
        <Route path='/result' element={<ResultPage/>}/>
      </Routes>
    </div>
  )
}

export default App