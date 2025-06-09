import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // seu arquivo de requisição
import "./home.css"; // crie esse css se quiser

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [generos, setGeneros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");


 useEffect(() => {
  async function carregarGeneros() {
    try {
      const response = await api.get("/genre/movie/list", {
        params: {
          api_key: "328e30d97723b14cb927d5adfc722139",
          language: "pt-BR",
        },
      });
      setGeneros(response.data.genres);
    } catch (error) {
      console.error("Erro ao carregar gêneros:", error);
    }
  }

  carregarGeneros();
}, []);

useEffect(() => {
  async function carregarFilmes() {
    if (generos.length === 0) return;

    try {
      const response = await api.get("/movie/popular", {
        params: {
          api_key: "328e30d97723b14cb927d5adfc722139",
          language: "pt-BR",
          page: pagina,
        },
      });

      const novosFilmes = response.data.results.map((filme) => {
        const genero = generos.find((g) => g.id === filme.genre_ids[0]);
        return {
          id: filme.id,
          titulo: filme.title,
          imagem: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
          categoria: genero ? genero.name : "Outro",
        };
      });

      setFilmes((prev) => {
        const novosUnicos = novosFilmes.filter(
          (novo) => !prev.some((f) => f.id === novo.id)
        );
        return [...prev, ...novosUnicos];
      });

      setTotalPaginas(response.data.total_pages);

      // Atualizar categorias sem repetir
      const novasCategorias = [
        ...new Set([...filmes, ...novosFilmes].map((f) => f.categoria)),
      ];
      setCategorias(["Todas", ...novasCategorias]);

    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }
    console.log("Página carregada:", pagina);
  carregarFilmes();
}, [pagina, generos]);

  const filmesFiltrados =
    categoriaSelecionada === "Todas"
      ? filmes
      : filmes.filter((f) => f.categoria === categoriaSelecionada);

  return (
    <div className="container">
      <h1 className="titulo">Movies</h1>

      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`filtro-btn ${
              cat === categoriaSelecionada ? "ativo" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filmes">
        {filmesFiltrados.map((filme) => (
          <div className="filme-card" key={filme.id}>
            <img src={filme.imagem} alt={filme.titulo} className="filme-img" />
            <h3>{filme.titulo}</h3>
            <Link to={`/${filme.id}`}>
              <button className="detalhes-btn">Detalhes</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
