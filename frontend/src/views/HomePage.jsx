import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <div>HomePage
      <div>
        <Link to="/create-post" className="font-inter font-medium bg-neon-blue text-dark-blue px-4 py-2 rounded-md">Create Image</Link>
      </div>
      
    </div>
  )
}

export default HomePage