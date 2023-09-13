
"use client";
import { useState, useEffect } from 'react';
import Header from '../header';
import Link from 'next/link';
import Button from '@/components/Button/Button';

export default function Home() {
  const [recibo, setRecibo] = useState();
  const [uploadData, setUploadData] = useState();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  


  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setRecibo(onLoadEvent.target.result);
      setUploadData(undefined);
    }

   reader.readAsDataURL(changeEvent.target.files[0]);
  }


  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    try {
      const data = await fetch('https://api.cloudinary.com/v1_1/dfmpqnyet/image/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());

      setRecibo(data.secure_url);
      setUploadData(data);

      // Após o upload bem-sucedido, envie os dados do formulário e a URL da imagem para a API
      const despesaData = {
        nome,
        preco,
        recibo: data.secure_url,
      };

      const response = await fetch('/api/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(despesaData)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
    <Header />
    <div className='ml-20 mr-20'>
        <Link  href="/expenses" >
          <Button type={"button"} isLoading={false}  variant={"relevante"}>
            BACK EXPENSES
          </Button>
        </Link>
      </div>
    <div style={{
      maxWidth: "80rem",
      minHeight: "100vh",
      padding:"2rem",
    }}>
      <main style={{
        alignItems: "center",
        textAlign: "center",
        backgroundColor:"white",
        borderRadius:"20px"
      }}>
        <h1 style={{
          margin: "0",
          height:"auto",
          fontSize: "2rem",
          backgroundColor:"blueviolet",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          padding:"1%",
          color:"white"
        }}>
          add expenses
        </h1>

        <form style={{
          borderRadius: ".5em",
          padding:"4%"
        }} method="post"  onSubmit={handleOnSubmit}>

          <p style={{
            border: "solid 1px gray",
            fontSize:"22px",
            borderRadius:"10px",
            padding:"1%",
            marginTop:"3%",
            marginBottom:"3%"

          }}>
            <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </p>
          <p style={{
            border: "solid 1px gray",
            fontSize:"22px",
            borderRadius:"10px",
            padding:"1%",
            marginTop:"3%",
            marginBottom:"3%"
          }}>
            <input type="text" name="preco" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </p>
          <p style={{
            border: "solid 1px gray",
            fontSize:"22px",
            borderRadius:"10px",
            padding:"1%",
            marginTop:"3%",
            marginBottom:"3%"
          }}>
            <input type="file" name="file" onChange={handleOnChange} required />
          </p>
          
          <img src={recibo} />
          
          {recibo && !uploadData && (
            <p>
              <button style={{
                color: "white",
                fontSize: "1em",
                backgroundColor: "blueviolet",
                border: "none",
                borderRadius: ".2em",
                padding:"2%",
                margin:"3%"
              }}
              >Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code style={{ textAlign: 'left'}}><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>
    </div>
    </>
  )
}


