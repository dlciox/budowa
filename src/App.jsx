import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20 w-full overflow-x-hidden">
          <div className="mx-auto max-w-screen-2xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/realizacje" element={<Projects />} />
              <Route path="/realizacje/:category" element={<Projects />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
