import React from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../components';

const HomePage = () => {
  return (
    <div>
      <Header />
      HomePage
      <div>
        <Link to="/create-post" className="font-inter font-medium bg-neon-blue text-dark-blue px-4 py-2 rounded-md">Create Image</Link>
      </div>
      
    </div>
  )
}

export default HomePage