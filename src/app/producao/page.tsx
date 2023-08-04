
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
    fetch('http://localhost:3000/api/producao')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json() as Promise<Cliente[]>; 
      })
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
  }, []);

  const markAsDone = (id: string) => {
    dispatch({
      type: 'UPDATE_START',
      payload: undefined
    });
    fetch(`/api/clientesServicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concluido: true }),
    })
    .then(response => response.json() as Promise<Servico>) 
    .then((updatedServico: Servico) => {
      dispatch({ type: 'UPDATE_SUCCESS', payload: updatedServico });
      window.location.reload(); 
    })
    .catch((error: Error) => dispatch({ type: 'UPDATE_ERROR', payload: error }));
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
                <button style={{ background:"red", borderRadius:"20px", color:"white"}} onClick={() => markAsDone(servico.id)}>Concluído</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
