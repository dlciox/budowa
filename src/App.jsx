import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Components
import Layout from './components/Layout';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/realizacje" element={<Projects />} />
            <Route path="/realizacje/:category" element={<Projects />} />
            <Route path="/realizacje/:category/:slug" element={<Projects />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
