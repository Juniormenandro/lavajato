"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';


interface Categoria {
  id: string;
  nome: string;
  Description: string;
  image:string;
}


const FormAdmin = () => {
 
  const [tipo, setTipo] = useState<'servico' | 'categoria'>('servico');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [Description, setDescription] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);


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



  return (
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
  );
};

export default FormAdmin;
