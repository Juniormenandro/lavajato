"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Header from '@/components/home/Header/HeaderPag';
import Client from '@/components/book/Client';
import Book from '@/components/book/Book';
import Painel from '@/components/Admin/painelAdmin/Painel';
import FormAdmin from '@/components/Admin/FormAdmin/FormAdmin';
import CreateAdminForm from '@/components/Admin/CreateAdminForm/CreateAdmin';
import SignUp from '@/components/Admin/SignUp/SignUp';


// Supondo que suas definições de tipos para Categoria e Serviço sejam assim:
interface Categoria {
  id: string;
  nome: string;
  Description: string;
  image:string;

}



const AdicionarCategoriaServico = () => {
 

  return (
    <div className=" md:hidden relative  bg-center  z-0"  
      style={{ backgroundImage: "url('/images/header/logo1.webp')" }} >  
      <Header/>
      <FormAdmin />
      <Painel />
      <Book />
      <Client /> 
      <SignUp /> 
      <CreateAdminForm />
    </div>
  );
};

export default AdicionarCategoriaServico;
