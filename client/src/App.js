import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing.jsx';
import Home from './Components/Home/Home.jsx';

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/home' element={<Home/>}/>
      </Routes>
  );
}

export default App;
