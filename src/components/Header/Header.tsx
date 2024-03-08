import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">Sua Marca</h1>
      <nav className="mt-2">
        <ul className="flex">
          <li className="mr-4"><a href="#" className="text-white hover:text-gray-300">Início</a></li>
          <li className="mr-4"><a href="#" className="text-white hover:text-gray-300">Serviços</a></li>
          <li><a href="#" className="text-white hover:text-gray-300">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
