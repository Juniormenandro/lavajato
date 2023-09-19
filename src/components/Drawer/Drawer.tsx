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
      className="bg-blue-400 m-3  rounded-lg"
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
      
    <AppDrawer open={isOpen} onClose={toggleDrawer} direction="left" style={{zIndex: 9999, backgroundColor:"paleturquoise"}} >
      
      <div className="flex flex-col gap-4 pl-5 pr-5 drawerhome">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#000000"
              viewBox="0 0 256 256"
          >
          </svg>
          <div className="flex justify-center text-center">
            <Link className="flex-1 mr-1 justify-center" href="/login"  onClick={toggleDrawer} >
              <Button type={"button"} isLoading={false} >
                <h1 className=" bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                  LOGIN
                </h1>
              </Button>
            </Link>

            <Link className="flex-1 ml-1 justify-center" href="/login"  onClick={handleLogout} >
              <Button type={"button"} isLoading={false} >
                <h1 className=" bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                  LOGOUT
                </h1>
              </Button>
            </Link>
          </div>

          <Link href="/netrevenue"
            className="mt-10"
            onClick={toggleDrawer} >
             <Button type={"button"} isLoading={false}  >
              <h1 className=" p-1  bg-cyan-50  font-semibold text-blue-500 rounded-lg">
              NET-REVENUE
              </h1>
             </Button>
          </Link>
          
          
          <Link href="/customers" onClick={toggleDrawer}>
            <Button type={"button"} isLoading={false} >
              <h1 className=" p-1  bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                CUSTOMERS
              </h1>
            </Button>
          </Link>

          <Link className=" p-1 mt-10" href="/upload"
            onClick={toggleDrawer} >
             <Button type={"button"} isLoading={false}  >
              <h1 className=" p-1  bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                CHARGE-EXPENSE
              </h1>
             </Button>
          </Link>


          <Link   href="/producao" onClick={toggleDrawer} >
             <Button type={"button"} isLoading={false} >
              <h1 className=" p-1  bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                PRODUCTION
              </h1>
            </Button>
          </Link>

          <Link href="/" className=" p-1 flex items-center  cursor-pointer w-full mb-5 " onClick={toggleDrawer} >
            <Button type={"button"} isLoading={false} variant={"danger"} >
              <h1 className=" bg-cyan-50  font-semibold text-blue-500 rounded-lg">
                FORM
              </h1>
            </Button>
          </Link>
      </div>
    </AppDrawer>
  </>
  );
};

export default Drawer;
