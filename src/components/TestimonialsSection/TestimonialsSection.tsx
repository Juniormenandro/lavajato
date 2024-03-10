import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-custom-blue-50 px-9 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemplo de depoimento */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.&quot;</p>
            <p className="font-semibold">- Cliente Satisfeito</p>
          </div>
          {/* Adicione mais depoimentos conforme necessário */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
