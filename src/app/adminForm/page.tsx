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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);



  return (
    <div className=" md:hidden relative  bg-center pb-10 z-0"  
      style={{ backgroundImage: "url('/images/header/logo1.webp')" }} >  
      <Header/>
      <FormAdmin />
      <Painel />
      <Book />
 
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>CUSTOMERS</h1>
        </div>
      </div>
      {isOpen && (
        <Client /> 
      )}

      <div className="md:hidden" onClick={() => setIsOpenSignUp(!isOpenSignUp)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>login</h1>
        </div>
      </div>
      {isOpenSignUp && (
        <SignUp /> 
      )}

<div className="md:hidden" onClick={() => setIsOpenAdmin(!isOpenAdmin)}>
        <div className='text-2xl mx-8 m-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>cria login admin</h1>
        </div>
      </div>
      {isOpenAdmin && (
      <CreateAdminForm />
      )}
    </div>
  );
};

export default AdicionarCategoriaServico;
