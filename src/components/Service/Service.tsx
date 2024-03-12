import Link from 'next/link';
import React, { useState } from 'react';
import '../Service/Service.css';


// Definindo um tipo para representar um serviço
type Service = {
    id: number;
    name: string;
    description: string;
  };
  
  // Definindo o array de serviços com o tipo explícito
  const services: Service[] = [
    { id: 1, name: 'Limpeza', description: 'Encontre profissionais de limpeza para sua casa ou escritório.' },
    { id: 2, name: 'Limpeza', description: 'Encontre profissionais de limpeza para sua casa ou escritório.' },
    { id: 3, name: 'Limpeza', description: 'Encontre profissionais de limpeza para sua casa ou escritório.' },
  ];
  
  const Service: React.FC = () => {
    const [selectedService, setSelectedService] = useState<number | null>(null);
  
    const handleServiceClick = (serviceId: number) => {
      setSelectedService(serviceId);
    };
  
    return (
      <div className="horizontal-scroll">
        {services.map((service) => (
          <div key={service.id} className="service-container" onClick={() => handleServiceClick(service.id)}>
            <a
              href="#"
              className={`service-card ${
                selectedService === service.id ? 'selected-service-card' : ''
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{service.name}</h3>
              <p>{service.description}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };
  
  export default Service;
  
/*
  import React from 'react';

// Ajustando o tipo de propriedades para incluir as informações do produto
type ServiceProps = {
    item: string;
    selectedItem: string;
    onClick: () => void;
    children?: React.ReactNode; 

};

const Service: React.FC<ServiceProps> = ({ item, selectedItem, onClick, children }) => {
  return (
    <div
      className={`service-card ${selectedItem === item ? 'selected-service-card' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Service;
*/