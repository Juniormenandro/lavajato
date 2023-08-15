"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';



interface Servicos {
  telefone: ReactNode;
  servicos: any;
  
  clienteId: string;
  id: string;
  
  pagamento: ReactNode;
  carro: string ,
  nome: string,
  preco: string,
  data: string,
  corCarro: string,
  modeloCarro: string,
  
}








export default function Page() {

  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('O usuário não está logado!');
      
      return;
    }
    setToken(userToken);
    console.log('Token from localStorage:', localStorage.getItem('token'));
}, []);


  

  

  const fetchOldURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/oldClients` : null;

  const { data: servicos, error: isError, isLoading } = useSWR<Servicos[]>(fetchOldURL ? [fetchOldURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  


  
  


useEffect(() => {
  if (isError) {
      console.log('Error detected:', isError);
      
  }
});


if (isError) {
  return <div>Erro detectado: {JSON.stringify(isError)}</div>;
}



  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
     <>
      <Header />
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"24px" }}>  OLD-CUSTOMERS</h1>
      <ul>
        {servicos && servicos?.map(client => (
          <li key={client.id} style={{ width: "100%" }}>
            <div className="flex" style={{marginTop:"15px",  marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
              <div style={{ minWidth: "50%", textAlign: "center"  }}>
                <h1 className="text-blue-500" style={{fontSize:"21px"}}>
                  {client.nome}
                </h1>
              </div>
              <div style={{  minWidth: "50%", textAlign: "center" }}>
                <h1 className="text-xl font-semibold text-blue-500  ">
                  {client.telefone}
                </h1>
              </div>
            </div>
            {client.servicos && client.servicos.map((servico: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; preco: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; pagamento: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; data: string | number | Date; modeloCarro: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; corCarro: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
              <div key={servico.id} className="flex" style={{fontSize:"19px", marginRight:"2%",  marginLeft:"2%", borderRight: "1px solid #c2c2c2",  borderLeft: "1px solid #c2c2c2", }}>
                <div style={{ minWidth: "50%", textAlign: "center" }}>
                  <h2 style={{fontSize:"19px"}}>serv: {servico.nome}</h2>
                  <h2 style={{fontSize:"19px"}}>price: {servico.preco}</h2>
                  <h2 style={{fontSize:"19px"}}>pay: {servico.pagamento}</h2>
                </div>
                <div style={{  minWidth: "50%", textAlign: "center"   }}>
                <h2 style={{fontSize:"19px"}}>
                  {servico.data && typeof servico.data === 'string' 
                    ? new Date(servico.data).toLocaleDateString('pt-BR') 
                    : 'Data não definida'}
                </h2>
                  <h2 style={{fontSize:"19px"}}>brand: {servico.modeloCarro}</h2>
                  <h2 style={{fontSize:"19px"}}>color: {servico.corCarro}</h2>
                </div>
              </div>
            ))}
          </li>
         ))
        }
      </ul>
      <br/><br/><br/><br/>
    </>
  );
}


