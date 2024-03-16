"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Header from '@/components/home/Header/HeaderPag';


// Supondo que suas definições de tipos para Categoria e Serviço sejam assim:
interface Categoria {
  id: string;
  nome: string;
  Description: string;
  image:string;
}

interface Servico {
  id: string;
  nome: string;
  Description: string;
  categoriaId: string;
}

const AdicionarCategoriaServico = () => {
  const [tipo, setTipo] = useState<'servico' | 'categoria'>('servico');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [Description, setDescription] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [categoriaSelecionadaParaFiltrar, setCategoriaSelecionadaParaFiltrar] = useState('');





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
  
    if (categoriaSelecionadaParaFiltrar) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/servicos/${categoriaSelecionadaParaFiltrar}`)
        .then(response => response.json())
        .then((data: Servico[]) => setServicos(data));
    }
  }, [categoriaSelecionadaParaFiltrar]);







  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

     // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome.trim() || !Description.trim() || (tipo === 'servico' && !categoriaId)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/categoriaServico` ;
    const body = tipo === 'categoria' ? {tipo, nome, Description, image } : {tipo, nome, Description, categoriaId };
   
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






  const deletarServico = (servicoId:Servico["id"]) => {
    console.log(servicoId,'id do servico')
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteServico/${servicoId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao deletar serviço');
      }
      return response.json();
    });
  };
  





  const handleDeletarClick = (servicoId:string) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este serviço?");
   
    // Se o usuário confirmar, prossegue com a deleção
    if (confirmar) {
      deletarServico(servicoId)
        .then(() => {
          // Atualiza o estado para remover o serviço deletado da lista
          const servicosAtualizados = servicos.filter(servico => servico.id !== servicoId);
          setServicos(servicosAtualizados);

        })
        .catch(error => {
          // Tratar o erro, se necessário
          console.error('Falha ao deletar serviço:', error);
          alert('Erro ao deletar serviço.');
        });
    }
  };
  

  const handleCategoriaChangeParaFiltrar = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSelecionadaParaFiltrar(e.target.value);
  };

  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded-lg p-6">

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Selecione entre  Categoria ou Serviço</h1>
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Adicionar Categoria</h1>
        )}
         {tipo === 'servico' && (
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Adicionar Serviço</h1>
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Adicionar a categoria referente</h1>
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
    </div>


    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded-lg p-6">

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Filtrar Serviços por Categoria</h1>
        <div className="mb-4">
            <select
              className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleCategoriaChangeParaFiltrar}
            >
              <option value="">Selecione uma Categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>

            {servicos.map((servico) => (
              <div key={servico.id} className="border-b border-gray-200 py-4 px-6 mb-14 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0 flex-1">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{servico.nome}</h3>
                    <p className="text-gray-600 overflow-auto max-h-32 md:max-h-full">{servico.Description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletarClick(servico.id)}
                    className="bg-red-500 text-white px-4 py-2 mt-4 md:mt-0 rounded hover:bg-red-700 transition-colors duration-200"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}

          </div>
        </form>
      </div>  
    </>
  );
};

export default AdicionarCategoriaServico;
