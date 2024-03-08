import React from 'react';


const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src="/images/header/logoprincipal.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
          <h1 className="text-2xl font-bold">Done_Jobs</h1>
        </a>
        <nav>
          <ul className="flex">
            <li className="mr-4"><a href="#" className="text-white hover:text-gray-300">Início</a></li>
            <li className="mr-4"><a href="#" className="text-white hover:text-gray-300">Serviços</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;