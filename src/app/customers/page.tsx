/*
import React from 'react';
import fetch from 'node-fetch';
import Header from '../header';
import RootLayout from '../layout';

export default async function Page() {

 
  const res = await fetch('http://localhost:3000/api/customers');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return (
    
   
    <RootLayout >
    <Header></Header>
  
    <ul>
      {data.map((client: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; telefone: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdAt: string | number | Date; servicos: any[]; }) => (
        
         <li key={client.id}
          
          style={{
             
            width:"100%"
           }}>

           

              <div  >
              <h1 className="text-xl font-semibold  text-red-600" style={{textAlign:"center",padding:"8%" }}>{client.nome}</h1>
                <p className="text-m font-semibold leading-6 text-blue-600" style={{textAlign:"right", paddingRight:"5%"}}>{client.telefone}</p>
                <p className="text-m font-semibold leading-6 " style={{textAlign:"right", paddingRight:"5%"}}>{new Date(client.createdAt).toLocaleDateString('pt-BR')}</p>
                
            </div>



                    {client.servicos && client.servicos.map(servico => (

                        <div key={servico.id} className="flex  " >
                           
                              <div style={{minWidth:"50%", textAlign:"center", padding:"5px",  borderRight: "1px solid #c2c2c2",  borderBottom: "1px solid #c2c2c2" }} >
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedProductNane}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedProdutPrice}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedPayment}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.rawPrice}</p>
                              </div>

                              <div   style={{minWidth:"50%", textAlign:"center",  borderBottom: "1px solid #c2c2c2"}} >
                              <p className="text-sm font-semibold leading-6 ">{new Date(servico.data).toLocaleDateString('pt-BR')}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedModel}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedColor}</p>
                                <p className="text-sm font-semibold leading-6 ">{servico.selectedTime}</p>
                              </div>    
                       </div>    
                      
                    ))}

             
            
          </li>
      ))}
    </ul>
    
    </RootLayout>
  );
}
*/




"use client";

import React, {  useEffect, useReducer, ReactNode } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";

// Definindo a interface para os dados do serviço
interface Servico {
  selectedColor: ReactNode;
  selectedTime: ReactNode;
  selectedPayment: ReactNode;
  selectedProdutPrice: ReactNode;
  selectedProductNane: ReactNode;
  id: string;
  carro: string;
  concluido: boolean;
  aguardandoPagamento: boolean;
  // Inclua os demais campos conforme necessário
}

interface Cliente {
  id: string;
  nome: string;
  servicos: Servico[];
  // Inclua os demais campos conforme necessário
}

const initialState = {
  loading: false,
  data: [],
  error: null,
};

function reducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_START':
      return { ...state, loading: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'UPDATE_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'FETCH_START',
      payload: undefined
    });
    fetch('http://localhost:3000/api/customers')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json() as Promise<Cliente[]>; 
      })
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
  }, []);

  const deleteService = (id: string) => {
    dispatch({
      type: 'DELETE_START',
      payload: undefined
    });
    console.log('Deletando o serviço:', id);
    fetch(`http://localhost:3000/api/customers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',  },
    })
    .then(response => response.json() as Promise<Servico>) 
    .then((deletedServico: Servico) => {
      dispatch({ type: 'DELETE_SUCCESS', payload: deletedServico });
      window.location.reload(); 
    })
    .catch(error => {
      console.error('Erro ao deletar o serviço:', error);
      dispatch({ type: 'DELETE_ERROR', payload: error });
    });
  }

  if (state.loading) {
    return  <div className="flex flex-col items-center mt-10">
    <Spinner />
  </div>;
  }

  return (
     <>
      <Header />
      <ul>
        {state.data.map((client: {
            id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode
            // Definindo a interface para os dados do serviço
            > | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; servicos: any[];
          }) => (
          <li key={client.id} style={{ width: "100%" }}>
            <div>
              <h1 className="text-xl font-semibold text-red-600" style={{ textAlign: "center", padding: "8%" }}>
                {client.nome}
              </h1>
            </div>
            {client.servicos && client.servicos.map(servico => (
              <div key={servico.id} className="flex">
                <div style={{ minWidth: "50%", textAlign: "center", padding: "5px", borderRight: "1px solid #c2c2c2", borderBottom: "1px solid #c2c2c2" }}>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
                </div>
                <div style={{ minWidth: "50%", textAlign: "center", borderBottom: "1px solid #c2c2c2" }}>
                  <p className="text-sm font-semibold leading-6 text-bg-teal-blue">{servico.selectedTime}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedTime}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
                </div>
                <button style={{ background:"red", borderRadius:"20px", color:"white"}} onClick={() => deleteService(servico.id)}>Deletar</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
