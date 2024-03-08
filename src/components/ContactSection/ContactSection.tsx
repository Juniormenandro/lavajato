import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-gray-800 text-white py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Entre em Contato</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">Nome:</label>
            <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" id="name" name="name" />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">Email:</label>
            <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="email" id="email" name="email" />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="message">Mensagem:</label>
            {/* Corrigindo o tipo do atributo rows para number */}
            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" id="message" name="message" rows={4}></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
