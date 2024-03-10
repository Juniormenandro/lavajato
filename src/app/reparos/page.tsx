// pages/reparos-de-propriedades/index.jsx
import Head from 'next/head';
import Link from 'next/link';

export default function ReparosDePropriedades() {
  return (
    <div>
      <Head>
        <title>Reparos de Propriedades - DoneJob</title>
        <meta name="description" content="Serviços de reparos de propriedades com profissionais qualificados. Encontre soluções rápidas e eficazes para manter seu imóvel em perfeitas condições." />
      </Head>
      
      <main>
        <h1>Reparos de Propriedades</h1>
        <p>Oferecemos um serviço completo de reparos para sua propriedade, garantindo qualidade e eficiência.</p>
        <Link href="/">Voltar para a Home</Link>
      </main>
    </div>
  );
}
