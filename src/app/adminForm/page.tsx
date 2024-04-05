"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/home/Header/HeaderPag';
import Client from '@/components/book/Client';
import Book from '@/components/book/Book';
import Painel from '@/components/Admin/painelAdmin/Painel';
import FormAdmin from '@/components/Admin/FormAdmin/FormAdmin';
import CreateAdminForm from '@/components/Admin/CreateAdminForm/CreateAdmin';
import SignUp from '@/components/Admin/SignUp/SignUp';
import { useRouter } from 'next/navigation';


const AdicionarCategoriaServico = () => {
  const [formCategoria, setFormCategoria] = useState(false);
  const [isPainel, setIsPainel] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const userToken = localStorage.getItem('token');
      if (!userToken) {
        alert('O usuário não está logado!');
        router.push("/");
        return;
      }
    }, []);



  return (
    <div className=" relative  bg-center py-28 z-0"  
      style={{ backgroundImage: "url('/images/header/logo1.webp')" }} >  
      <Header/>

      <div onClick={() => setIsBook(!isBook)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>List de Booking</h1>
        </div>
      </div>
      {isBook && (
        <Book />
      )}

       <div onClick={() => setIsOpen(!isOpen)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>List de Cliente</h1>
        </div>
      </div>
      {isOpen && (
        <Client /> 
      )}

      <div onClick={() => setIsPainel(!isPainel)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>List de Service</h1>
        </div>
      </div>
      {isPainel && (
        <Painel />
      )}
      
      <div onClick={() => setFormCategoria(!formCategoria)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>Adicionar Categoria ou Serviço</h1>
        </div>
      </div>
      {formCategoria && (
        <FormAdmin />
      )}

      <div  onClick={() => setIsOpenSignUp(!isOpenSignUp)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
          <h1>cria login</h1>
        </div>
      </div>
      {isOpenSignUp && (
        <SignUp /> 
      )}

<div  onClick={() => setIsOpenAdmin(!isOpenAdmin)}>
        <div className='text-2xl mx-8 mt-10 text-center bg-white p-4 font-semibold rounded-lg'>
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
