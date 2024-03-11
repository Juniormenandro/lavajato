import Link from 'next/link';
import React from 'react';
import '../FeaturesSection/FeaturesSection.css';


const FeaturesSection = () => {
  return (
    <div >
      
      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/reparos.jpg')" }}>
        <Link href="reparos" className="service-card " >
          <div className="container  text-center">
            <h2 className="text-2xl mb-4">Reinvente Seu Espaço: Soluções Ágeis em Reparos!</h2>
            <p className="text-xl">Descubra reparos de propriedades que misturam qualidade e rapidez. Nossa equipe transforma seu espaço, garantindo funcionalidade e estética. Clique e veja como podemos ajudar!</p>
          </div>
        </Link>
      </div>
    
      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/pintura.jpg')" }}>
        <Link href="pintura" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Renove com Cores: Pintura que Transforma!</h2>
            <p className="text-xl">Eleve o visual do seu espaço com nossa pintura especializada. Trazemos vida e estilo para sua casa ou escritório. Clique para descobrir a diferença que podemos fazer!</p>
          </div>
        </Link>
      </div>

      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/limpeza.jpg')" }}>
        <Link href="limpeza" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Pureza e Brilho: Limpeza Profunda para Seu Lar!</h2>
            <p className="text-xl">xperimente uma limpeza que revitaliza espaços e energias. Nossa equipe cuida do seu lar com eficácia e carinho. Clique para saber mais!</p>
          </div>
        </Link>
      </div>

      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1670002392440-0a64552ae431?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <Link href="wash" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Seu Carro como Novo: Limpeza e Reparo Especializado!</h2>
            <p className="text-xl">Oferecemos limpeza e reparo automotivo que restaura a beleza e performance do seu veículo. Conheça nosso serviço exclusivo. Clique aqui!</p>
          </div>
        </Link>
      </div>

      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/mecanica.jpg')" }}>
        <Link href="mecanica" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Performance Garantida: Serviços de Mecânica!</h2>
            <p className="text-xl">Aprimore a funcionalidade do seu carro com nossa mecânica avançada. Atendimento especializado para todos os modelos. Clique e confira!</p>
          </div>
        </Link>
      </div>

      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/transfer.jpg')" }}>
        <Link href="transfer" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Seu Destino, Nossa Missão: Transfer e Entregas!</h2>
            <p className="text-xl">Serviço autônomo de transporte de pessoas e objetos. Confiabilidade e personalização para suas necessidades. Explore mais clicando aqui!</p>
          </div>
        </Link>
      </div>

      

      <div  className=" service-container relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('/images/service/sos.jpg'" }}>
        <Link href="sos" className="service-card " >
          <div className="container mx-auto text-center">
            <h2 className="text-2xl mb-4">Solução Imediata: Socorro para Carro e Casa!</h2>
            <p className="text-xl">Atendimento emergencial 24/7 para seu veículo ou residência. Profissionais prontos para qualquer situação. Clique para tranquilidade a qualquer hora!</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturesSection;