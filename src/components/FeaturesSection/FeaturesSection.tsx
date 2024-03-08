import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl mb-2">Serviço 1</h3>
            <p className="text-gray-700">Descrição do serviço 1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl mb-2">Serviço 2</h3>
            <p className="text-gray-700">Descrição do serviço 2</p>
          </div>
          {/* Adicione mais cartões de recursos conforme necessário */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
