// Importando os hooks necessários do React
"use client";
import React, { useState, useEffect } from 'react';


const AdicionarCategoriaServico = () => {
  // Estados para controlar os inputs do formulário
  const [tipo, setTipo] = useState('categoria'); // 'categoria' ou 'servico'
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');


  // Carregar as categorias existentes quando o componente é montado
  useEffect(() => {
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos do admin page:", data);
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error('Dados recebidos não são um array:', data);
        }
      })
      .catch(error => console.error('Erro ao buscar categorias:', error));
  }, []);

  function handleCategoriaChange(categoriaId) {
    console.log(categoriaId); // Log o ID da categoria selecionada, se necessário
    setCategoriaSelecionada(categoriaId);
    if (!categoriaId) {
      setServicos([]);
      return;
    }
    fetch(`/api/servicos/${categoriaId}`)
      .then(response => response.json())
      .then(data => setServicos(data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = tipo === 'categoria' ? { tipo, nome, image } : { tipo, nome, descricao, categoriaId };

    fetch('/api/categoriaServico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Limpar o formulário e atualizar a UI conforme necessário
      setTipo('categoria');
      setNome('');
      setDescricao('');
      setCategoriaId('');
      // Atualizar a lista de categorias se uma nova categoria foi adicionada
      if (tipo === 'categoria') {
        setCategorias([...categorias, data]);
        setImage('');
      }
    });
  };

  return (
    <div>
      <h1>Adicionar Categoria ou Serviço</h1>
      <form onSubmit={handleSubmit}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="categoria">Categoria</option>
          <option value="servico">Serviço</option>
        </select>

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
         <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="image"
          
        />

        {tipo === 'servico' && (
          <>
     
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required={tipo === 'servico'}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Adicionar {tipo}</button>
      </form>
      <div>
        <h1>Serviços por Categoria</h1>
        <select
          value={categoriaSelecionada}
          onChange={(e) => handleCategoriaChange(e.target.value)}
          required
        >
          <option value="">Selecione uma Categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}> {/* Ajuste aqui */}
              {categoria.nome}
            </option>
          ))}
        </select>

        <div>
          {servicos.length > 0 ? (
            <ul>
              {servicos.map((servico) => (
                <div key={servico.id}> {/* Ajuste aqui */}
                  <h2>{servico.nome}</h2>
                  <p>{servico.descricao}</p> {/* Mudado de h2 para p para descrição */}
                </div>
              ))}
            </ul>
          ) : (
            <p>Selecione uma categoria para ver os serviços.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdicionarCategoriaServico;
