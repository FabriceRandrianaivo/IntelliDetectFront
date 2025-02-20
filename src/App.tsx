import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import TopHeader from './composents/topHeader.tsx';
import './assets/scss/pages/App.scss';
import Home from './page/home';

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
        <TopHeader theme={isDarkTheme} setTheme={setIsDarkTheme} />
      </header>
      <Routes>
        <Route path="/home" element={<Home theme={isDarkTheme}/>} />
        <Route path="*" element={<p>Not Fund</p>} />
      </Routes>
    </Router>
  );
};

export default App;
