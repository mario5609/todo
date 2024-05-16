import { useState } from 'react'
import SignIn from '../src/views/SignIn/SignIn'
import './App.css'
import Home from './views/Home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setAuthenticated={setAuthenticated} />} />
        <Route path="/home" element={authenticated ? <Home /> : <SignIn setAuthenticated={setAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App
