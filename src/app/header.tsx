"use client"
import dynamic from "next/dynamic";
import React from "react";



const DynamicDrawer = dynamic(() => import("@/components/Drawer/Drawer"), {
  ssr: false,
});
const Header: React.FC = () => {
return (
  <>
  <header className=" pt-16 pb-16  rounded-b-2xl  "
    style={{
      backgroundImage: `url('/images/logo.jpg')`,
      backgroundPosition: 'center', // Centraliza a imagem de fundo
      backgroundRepeat: 'no-repeat', // Previne a repetição da imagem
      backgroundSize: '390px' // Faz a imagem cobrir toda a área disponível
    }}>
    
  </header>
    <nav className=" fixed bottom-2 left-1">
      <DynamicDrawer  /> 
    </nav>
</>
);
};

export default Header;
