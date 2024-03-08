import React from 'react';

const FeaturesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Limpeza</h3>
            <p>Encontre profissionais de limpeza para sua casa ou escritório.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-semibold mb-4">Consertos</h3>
            <p>Contrate especialistas para resolver problemas em sua casa ou empresa.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Reparos</h3>
            <p>Obtenha ajuda rápida para consertar qualquer coisa, de eletrodomésticos a encanamento.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-4">Entregas</h3>
            <p>Receba ou envie itens com segurança e rapidez.</p>
          </a>
        </div>
      </main>
    </div>
    

    
  );
};

export default FeaturesSection;
