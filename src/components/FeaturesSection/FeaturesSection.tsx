import Link from 'next/link';
import React from 'react';
import '../FeaturesSection/FeaturesSection.css';


const FeaturesSection = () => {
  return (
    <div className='p-5'>
      <section className="bg-cover bg-center text-white py-28 mb-11 reparos">
        <Link href="reparos" >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Reinvente Seu Espaço: Soluções Ágeis em Reparos!</h2>
            <p className="text-xl">Descubra reparos de propriedades que misturam qualidade e rapidez. Nossa equipe transforma seu espaço, garantindo funcionalidade e estética. Clique e veja como podemos ajudar!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 pintura">
        <Link href="pintura">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Renove com Cores: Pintura que Transforma!</h2>
            <p className="text-xl">Eleve o visual do seu espaço com nossa pintura especializada. Trazemos vida e estilo para sua casa ou escritório. Clique para descobrir a diferença que podemos fazer!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 limpeza">
        <Link href="limpeza">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Pureza e Brilho: Limpeza Profunda para Seu Lar!</h2>
            <p className="text-xl">xperimente uma limpeza que revitaliza espaços e energias. Nossa equipe cuida do seu lar com eficácia e carinho. Clique para saber mais!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 wash">
        <Link href="wash">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Seu Carro como Novo: Limpeza e Reparo Especializado!</h2>
            <p className="text-xl">Oferecemos limpeza e reparo automotivo que restaura a beleza e performance do seu veículo. Conheça nosso serviço exclusivo. Clique aqui!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 mecanica">
        <Link href="mecanica">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Performance Garantida: Serviços de Mecânica!</h2>
            <p className="text-xl">Aprimore a funcionalidade do seu carro com nossa mecânica avançada. Atendimento especializado para todos os modelos. Clique e confira!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 transfer">
        <Link href="transfer">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Seu Destino, Nossa Missão: Transfer e Entregas!</h2>
            <p className="text-xl">Serviço autônomo de transporte de pessoas e objetos. Confiabilidade e personalização para suas necessidades. Explore mais clicando aqui!</p>
          </div>
        </Link>
      </section>
      <section className="bg-cover bg-center text-white py-28 mb-11 sos">
        <Link href="sos">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Solução Imediata: Socorro para Carro e Casa!</h2>
            <p className="text-xl">Atendimento emergencial 24/7 para seu veículo ou residência. Profissionais prontos para qualquer situação. Clique para tranquilidade a qualquer hora!</p>
          </div>
        </Link>
      </section>
    </div>
    
  );
};

export default FeaturesSection;
