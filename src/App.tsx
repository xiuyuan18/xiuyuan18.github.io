import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Teaching from './pages/Teaching';
import Blog from './pages/Blog';

// Dynamically import BlogPost so heavy markdown/math libraries are split out
const BlogPost = lazy(() => import('./pages/BlogPost'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<div className="text-center py-12 text-academic-500">Loading post...</div>}>
                <BlogPost />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
