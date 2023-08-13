"use-client";
import Link from "next/link";
import React from "react";
import AppDrawer from "react-modern-drawer";

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  async function handleLogout() {
    localStorage.setItem("token", "");
  }
  
  


  return (
    <>
      <button onClick={toggleDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
        </svg>
      </button>
      <AppDrawer open={isOpen} onClose={toggleDrawer} direction="left">
        <div className="flex flex-col gap-4 p-4">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#000000"
              viewBox="0 0 256 256"
              className=""
            >
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
            </svg>
          <Link
            href="/"
            className="flex items-center  hover:text-gray-700 cursor-pointer w-full"
            onClick={toggleDrawer}
          >
            
           
            <span className="p-2 rounded-lg">HOME</span>
          </Link>
         
          
          <Link
            href="/producao"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            <h1>PRODUCTION</h1>
          </Link>
          <Link
            href="/booking"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            BOOKING
          </Link>
          <Link
            href="/customers"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            CUSTOMERS
          </Link>
          <Link
          style={{marginTop:"100px"}}
            href="/oldClients"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            OLD-CUSTOMERS
          </Link>
          <Link
            href="/login"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            LOGIN
          </Link>
          <Link
            href="/login" 
            className=" hover:text-gray-700"
            onClick={handleLogout}
          >
            LOGOUT
          </Link>
          
      </div>
      </AppDrawer>
    </>
  );
};

export default Drawer;
