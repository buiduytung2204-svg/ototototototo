/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetails from './pages/CarDetails';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import About from './pages/About';
import Contact from './pages/Contact';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black text-white font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
        </div>
      </Router>
    </AppProvider>
  );
}
