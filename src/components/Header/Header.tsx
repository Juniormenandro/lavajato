import React from 'react';


const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        
        <a href="#" className="flex items-center">
          <img src="/images/header/nomelogo.jpg" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
          
        </a>

        <button className="bg-blue-300 hover:bg-blue-500 text-white py-1 px-3 rounded-lg">Login</button>
      </div>
    </header>
  );
};

export default Header;