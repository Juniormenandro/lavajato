"use client"
import dynamic from "next/dynamic";
import React from "react";



const DynamicDrawer = dynamic(() => import("@/components/Drawer/Drawer"), {
  ssr: false,
});
const Header: React.FC = () => {
return (
  <>
  <header className="flex "
    style={{
     
      paddingTop:"70px",
      paddingBottom:"30px",
     
      backgroundImage: `url('/images/logo.jpg')`,
      backgroundPosition: 'center', // Centraliza a imagem de fundo
      backgroundRepeat: 'no-repeat', // Previne a repetição da imagem
      backgroundSize: '350px' // Faz a imagem cobrir toda a área disponível
    }}>
    
  </header>
  <div className="w-full max-w-5xl"  >
  <div className="flex items-center justify-between" >
    <nav className="flex c" style={{position:'fixed', bottom:"10px", left:"5px"}}>
      <DynamicDrawer  /> 
    </nav>
  </div>
</div>
</>
);
};

export default Header;
