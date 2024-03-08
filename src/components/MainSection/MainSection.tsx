import React from 'react';

const MainSection = () => {
  return (
    <section className="bg-cover bg-center text-white py-32" style={{ backgroundImage: "url('/images/main-bg.jpg')" }}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl mb-4">Bem-vindo à Nossa Marca</h2>
        <p className="text-xl">Oferecemos soluções inovadoras para todos os seus problemas</p>
      </div>
    </section>
  );
};

export default MainSection;
