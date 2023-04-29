"use client";
import Image from "next/image";
import { useState } from "react";

function ImageUploader(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setResponse("")
      setImage(event.target.files[0]);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => setResponse(json.names))
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // NOTE: O Next não permite apontar para pastas fora do projeto,
  // então as imagens do banco de dados foram replicadas para dentro do diretório `public/uploads`
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Selecione uma imagem:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {image && (
        <Image width={96} height={96} src={`/uploads/${image?.name}`} alt="" />
      )}
      {response && <p>{response}</p>}
    </div>
  );
}

export default ImageUploader;
