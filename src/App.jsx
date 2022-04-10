import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleInput() {
    if (input === '') {
      alert('Digite um CEP válido');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('CEP não encontrado');
      setInput('');
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
        />
        <button onClick={handleInput}>
          <FiSearch className="searchIcon" size={25} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main>
          <span>Cep: {cep.cep} </span>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Cidade: {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
