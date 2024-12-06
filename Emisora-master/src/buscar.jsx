import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Buscar = () => {
  const navigate = useNavigate();

  // Estados para el término de búsqueda y los resultados
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Función para manejar la búsqueda dinámica
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevenir recarga del formulario
    setError(""); // Limpiar errores

    try {
      const response = await fetch(`http://localhost:5000/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term: searchTerm }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al realizar la búsqueda.");
        return;
      }

      const data = await response.json();
      setResults(data.results || []); // Actualizar resultados
    } catch (err) {
      setError("Error de conexión con el servidor.");
      console.error("Search error:", err);
    }
  };

  return (
    <div>
      <h1>Buscar</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese un término de búsqueda"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Buscar;
