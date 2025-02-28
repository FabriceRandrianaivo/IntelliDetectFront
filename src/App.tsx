import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import TopHeader from './components/topHeader.tsx';
import './assets/scss/pages/App.scss';

import Navbar from './components/navBar.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import Signup from './pages/sign-up/signup.tsx';
// import Detection from './pages/detection/detection.tsx';
import Streaming from './pages/streaming/streaming.tsx';


const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add('theme-dark');
      body.classList.remove('theme-light');
    } else {
      body.classList.add('theme-light');
      body.classList.remove('theme-dark');
    }
  }, [isDarkTheme]);

  return (
    <Router>
      <header>
        {/* <TopHeader theme={isDarkTheme} setTheme={setIsDarkTheme} /> */}
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home theme={isDarkTheme} />}/>
          {/* <Route path="/home" element={<Home theme={isDarkTheme} />} /> */}
          <Route path="login" element={<Login theme={isDarkTheme} />} />
          <Route path="sign-up" element={<Signup theme={isDarkTheme} />} />
          <Route path="stream" element={<Streaming theme={isDarkTheme} />} />
          {/* <Route path="detection" element={<Detection theme={isDarkTheme} />} /> */}
          <Route path="*" element={<p>Not Fund</p>} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
