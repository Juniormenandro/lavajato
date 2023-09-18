import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

const CreateAdminForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/createadmin', formData);
      setMessage('Admin criado com sucesso: ' + JSON.stringify(response.data));
      router.push("/");
    } catch (error) {
      console.log(error)
      setMessage('Erro ao criar admin: ');
    }
  };

  return (
    <form className=' m-10 '
     onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label className='block mb-2'>
          Nome:
          <input
           className="w-full p-2 border rounded-lg border-black focus:border-blue-500 !important"
          type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div  className='mb-3'>
        <label className='block mb-2'>
          Email:
          <input  className="w-full p-2 border rounded-lg border-black focus:border-blue-500 !important"
           type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div  className='mb-8'>
        <label className='block mb-2'>
          Senha:
          <input  className="w-full p-2 border rounded-lg border-black focus:border-blue-500 !important"
           type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
      </div>
      <Button type="submit" isLoading={false}>Criar Admin</Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateAdminForm;
