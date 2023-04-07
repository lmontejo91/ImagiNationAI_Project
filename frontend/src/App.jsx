import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import logo from './assets/logo.png';
import { HomePage, ImagePage, GeneratorPage, UserProfilePage } from './views';

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-dark-blue sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 object-contain"></img>
        </Link>
        
        <Link to="/create-post" className="font-inter font-medium bg-neon-blue text-dark-blue px-4 py-2 rounded-md">Create Image</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<GeneratorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

