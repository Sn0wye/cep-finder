import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import api from "./services/api";

const containerVariants = {
  hidden: {
    y: "100vw",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: "80",
      duration: 1,
    },
  },
};

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite um CEP válido");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      console.log(input);
    } catch {
      alert("CEP não encontrado");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1>Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <button onClick={handleSearch}>
          <FiSearch className="searchIcon" size={25} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <span>Cep: {cep.cep} </span>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Cidade: {cep.localidade} - {cep.uf}
          </span>
        </motion.main>
      )}
    </div>
  );
}

export default App;
