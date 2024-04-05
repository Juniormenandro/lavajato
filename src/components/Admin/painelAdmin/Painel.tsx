import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';






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
    rawPrice: number;
  }


const Painel = () =>{

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
    <form className="bg-gray-50 shadow-md rounded-lg p-8 mx-8">
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
                  <p className="text-gray-600 overflow-auto max-h-32 md:max-h-full">{servico.rawPrice}</p>
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
  );
}

export default Painel