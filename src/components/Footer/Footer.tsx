import React from 'react';

const Footer = () => {
  return (
    <footer aria-label="Site footer"  className="bg-gray-800 text-white p-4 ">
      <nav className='ml-1'>
          <ul data-region="footer" className="flex ">
            <li className="mr-4" >
              <a href="/" className="text-white hover:text-gray-300" title="Copyright 2024 DoneJobs Service" >DoneJobs © 2024</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white hover:text-gray-300">Privacy &amp; Legal</a>
            </li>
            <li className="mr-4" >
              <a href="/" className="text-white hover:text-gray-300">Vehicle Recalls</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white hover:text-gray-300" >Contact</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white hover:text-gray-300">News</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white hover:text-gray-300" >Get Updates</a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-white hover:text-gray-300">Locations</a>
            </li>
          </ul>
        <div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;



