"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';


interface Categoria {
  id: string;
  nome: string;
  Description: string;
  image:string;
  areaId: string;
}

const staticProducts = [
  {
    areaId: "casa",
    nome: "casa",
  },
  {
    areaId: "carro",
    nome: "carro",
  },
  {
    areaId: "humano",
    nome: "humano",
  },
  {
    areaId: "pet",
    nome: "pet",
  },
];


const FormAdmin = () => {
 
  const [tipo, setTipo] = useState<'servico' | 'categoria'>('servico');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');
  const [areaId, setAreaId] = useState('');
  const [rawPrice, setRawPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [Description, setDescription] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`)
      .then(response => {
          if (!response.ok) {
          throw new Error('A resposta da rede não foi ok');
          }
          if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Não recebemos JSON');
          }
          return response.json();
      })
      .then((data: Categoria[]) => setCategorias(data) )
      .catch(error => console.error('Erro ao buscar categorias:', error));
      
      
  }, []);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
     // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome.trim() || !Description.trim() || (tipo === 'servico' && !categoriaId)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/categoriaServico` ;
    const body = tipo === 'categoria' ? {tipo, nome, Description, image, areaId } : {tipo, nome, Description, rawPrice, categoriaId };
   
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(() => {
        // Lógica após submissão bem-sucedida
        alert('Adicionado com sucesso');
        setNome('');
        setImage('');
        setDescription('');
        setCategoriaId('');
        setAreaId('');
        setRawPrice(0);
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar.');
      })
      .finally(() => {
        setIsSubmitting(false); // Finaliza o envio
      });
  };



  return (
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8  mx-8 ">
        <div className="mb-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'categoria' | 'servico')}
          >
            <option value="categoria">Categoria</option>
            <option value="servico">Serviço</option>
          </select>
        </div>

        {tipo === 'categoria' && (
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Adicionar Categoria</h1>
        )}
         {tipo === 'servico' && (
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Adicionar Serviço</h1>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4"> 
              <textarea
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

        {tipo === 'categoria' && (
          <div className="mb-4">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL da Imagem"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

         {tipo === 'servico' && (
          <div className="mb-4">
            <h1 className="text-ms font-semibold text-gray-800 mb-5">Valor Referente ao Servico:</h1>
            <input 
              type="number"
              value={rawPrice}
              onChange={(e) => {
                // Converte o valor do input para um número
                const value = Number(e.target.value);
                // Verifica se o valor é um número válido antes de atualizar o estado
                if (!isNaN(value)) {
                  setRawPrice(value); // Atualiza o estado, assumindo que setRawPrice é uma função que espera um número
                }
              }}
              placeholder="Preço"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {tipo === 'categoria' && (
          <div className="mb-4">
            <h1 className="text-ms font-semibold text-gray-800 mb-5">Adicionar a categoria referente</h1>
            <select
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione uma area</option>
              {staticProducts.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {tipo === 'servico' && (
          <div className="mb-4">
            <h1 className="text-ms font-semibold text-gray-800 mb-5">Adicionar a categoria referente</h1>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Enviando...' : 'Adicionar'}
        </button>
      </form>
  );
};

export default FormAdmin;
