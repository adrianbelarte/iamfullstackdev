import { useState } from "react";

function InputCreate() {
  const [title, setTitle] = useState("");
  const [res, setRes] = useState(`listo para enviar`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlApiCreate = `${import.meta.env.VITE_APP_API_URL}create`;
    const payload = { title };

    try {
      const response = await fetch(urlApiCreate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(response.ok){
        const data = await response.json()
        setRes(`enviado: ${data.title}`)
        setTitle(``)
      }else{
        throw new Error(`error`)
      }

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      console.log("Tarea creada:", data);
    } catch (err) {
      console.error("Error al crear la tarea:", err);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe una tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
    <h2>{res}</h2>
    </>
  );
}

export default InputCreate;
