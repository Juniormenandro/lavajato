import React from 'react';

const Footer = () => {
  return (
    <footer aria-label="Site footer"  className="bg-gray-800 text-white p-4 w-full h-24 border-t flex justify-center items-center ">
      <nav className='ml-1'>
          <ul data-region="footer" className="flex ">
            <li className="mr-4" >
              <a href="/" className="text-white text-xs hover:text-gray-300" title="Copyright 2024 DoneJobs Service" >DoneJobs © 2024</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white text-xs hover:text-gray-300">Privacy &amp; Legal</a>
            </li>
            <li className="mr-4" >
              <a href="/" className="text-white text-xs hover:text-gray-300">service Recalls</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white text-xs hover:text-gray-300" >Contact</a>
            </li>
          </ul>
        <div>
        </div>
      </nav>
    </footer>
    
  );
};

export default Footer;



