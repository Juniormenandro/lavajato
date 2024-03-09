import React from 'react';
import '../MainSection/MainSection.css';

const MainSection = () => {
  return (
    <section className="main-section text-white py-48">
      <div className="video-overlay"></div>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/images/service/montanha.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em MP4.
      </video>
      <div className="container mx-auto text-center z-10 relative">
        <h2 className="text-4xl mb-4">Bem-vindo à Done_Jobs</h2>
        <p className="text-xl">Oferecemos soluções inovadoras para todos os seus problemas</p>
      </div>
    </section>
  );
};

export default MainSection;
