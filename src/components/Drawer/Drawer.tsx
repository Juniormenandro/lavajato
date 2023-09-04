"use-client";
import Link from "next/link";
import React from "react";
import AppDrawer from "react-modern-drawer";
import Button from "../Button/Button";

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
    
      <button
      className="bg-blue-400 m-3 rounded-lg"
      onClick={toggleDrawer}>
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
      <div className="flex flex-col gap-4 p-4 ">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#000000"
              viewBox="0 0 256 256"
              className=""
            >
              </svg>
          <Link
            href="/oldClients"
            onClick={toggleDrawer}
          >
            <Button type={"button"} isLoading={false} >
            OLD-CUSTOMERS
            </Button>
          </Link>
        
          
         
          <Link
            href="/booking"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
            <Button type={"button"} isLoading={false}>
            BOOKING
            </Button>
          </Link>
          <Link
            href="/customers"
            className=" mt-2"
            onClick={toggleDrawer}
          >
             <Button type={"button"} isLoading={false}>
             CUSTOMERS
            </Button>
           
          </Link>

          <Link
            href="/producao"
            className=" hover:text-gray-700"
            onClick={toggleDrawer}
          >
             <Button type={"button"} isLoading={false} >
             PRODUCTION
            </Button>
          </Link>

          <Link
            href="/"
            className="flex items-center  cursor-pointer w-full mb-5 "
            onClick={toggleDrawer}
          >
            <Button type={"button"} isLoading={false} variant={"home"} >
            <span className="p-2 rounded-lg">FORM</span>
            </Button>
          </Link>

          <div className="flex">
            <Link
              style={{ minWidth: "50%", textAlign: "center" }}
              href="/login"
              className=" hover:text-gray-700 "
              onClick={toggleDrawer}
            >
              <Button type={"button"} isLoading={false} variant={"relevante"}>
              LOGIN
              </Button>
            </Link>
            <Link
            style={{ minWidth: "50%", textAlign: "center" }}
              href="/login" 
              className=" hover:text-gray-700"
              onClick={handleLogout}
            >
              <Button type={"button"} isLoading={false} variant={"danger"}>
              LOGOUT
              </Button>
            </Link>
          </div>
      </div>
      </AppDrawer>
    </>
  );
};

export default Drawer;
