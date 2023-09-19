
"use client";
import { useState, useEffect } from 'react';
import Header from '../header';
import { useRouter } from "next/navigation";


export default function Home() {
  const [recibo, setRecibo] = useState();
  const [uploadData, setUploadData] = useState();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  
  const router = useRouter();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    const file = changeEvent.target.files[0];
  
    if (file) {
      reader.onload = function (onLoadEvent) {
        setRecibo(onLoadEvent.target.result);
        setUploadData(undefined);
      };
  
      reader.readAsDataURL(file);
    } else {
      setRecibo(undefined);
      setUploadData(undefined);
    }
  }
  
  async function handleOnSubmit(event) {
    event.preventDefault();
  
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === "file");
  
    const formData = new FormData();
  
    if (fileInput.files.length > 0) {
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
  
      formData.append("upload_preset", "my-uploads");
  
      try {
        const data = await fetch("https://api.cloudinary.com/v1_1/dfmpqnyet/image/upload", {
          method: "POST",
          body: formData,
        }).then((r) => r.json());
  
        setRecibo(data.secure_url);
        setUploadData(data);
  
        // Se o upload for bem-sucedido, proceda com o envio dos dados
        sendFormData(data.secure_url);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Se não houver arquivo, envie os dados sem a URL da imagem
      sendFormData(null);
    }
  }
  
  async function sendFormData(imageUrl) {
    const despesaData = {
      nome,
      preco,
      recibo: imageUrl,
    };
  
    try {
      const response = await fetch("/api/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(despesaData),
      });
  
      const result = await response.json();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
  


  return (
    <>
    <Header />
    <div style={{
      width:"100%",
      minHeight: "100vh",
      padding:"2rem",
    }}>

      <div className='text-2xl text-center mr-5 ml-5 mb-5 font-semibold bg-white p-2 rounded-2xl'>
        <h1>CHARGE-EXPENSE</h1>
      </div>
      <main style={{
        alignItems: "center",
        backgroundColor:"white",
        borderRadius:"20px"
      }}>
        
        
        <form style={{
          borderRadius: ".5em",
          padding:"5%"
        }} method="post"  onSubmit={handleOnSubmit}>

          <div className='mb-3'>
            <label className='block mb-2'>
            Description :
              <input
              className="w-full p-2 border-2 rounded-lg focus:border-blue-500 !important"
              type="text" name="nome" placeholder="text..." value={nome} onChange={(e) => setNome(e.target.value)} required/>
            </label>
          </div> 

          <div className='mb-3'>
            <label className='block mb-2'>
              Price:
              <input
              className="w-full p-2 border-2 rounded-lg  focus:border-blue-500 !important"
              type="text" name="preco" placeholder="text..." value={preco} onChange={(e) => setPreco(e.target.value)} required />            </label>
          </div> 
          

          <p className="border-2  text-xl rounded-lg p-1 mt-3 mb-3">
            <input type="file" name="file" className="w-full h-full text-sm" onChange={handleOnChange} />
          </p>
          




          <img src={recibo} />
          
            <p>
              <button 
                className="w-full p-2 mt-3 text-white rounded-lg relative bg-blue-500">
                  Upload Files
              </button>
            </p>
          

          {uploadData && (
            <code style={{ textAlign: 'left'}}><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>
    </div>
    </>
  )
}


