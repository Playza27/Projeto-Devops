import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// --- Início da Definição dos Estilos ---

const AppContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1d3557;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  color: #457b9d;
  border-bottom: 2px solid #f1faee;
  padding-bottom: 10px;
  margin-top: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 15px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,123,255,.25);
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

// Botão de remoção, que herda estilos do botão principal mas muda a cor
const RemoveButton = styled(Button)`
  background-color: #e63946; // Cor vermelha para perigo
  width: auto; // Tamanho automático para se ajustar ao texto
  padding: 8px 12px;
  font-size: 0.9rem;

  &:hover {
    background-color: #c12b37;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  display: flex; // Alinha o texto e o botão na mesma linha
  justify-content: space-between; // Espaça o texto e o botão
  align-items: center; // Centraliza verticalmente

  &:last-child {
    border-bottom: none;
  }
`;

// --- Fim da Definição dos Estilos ---

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    axios.get(`${API_URL}/itens`)
      .then(response => setItems(response.data))
      .catch(error => console.error("Houve um erro ao buscar os itens:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) return;

    axios.post(`${API_URL}/itens`, { nome: name, descricao: description })
      .then(response => {
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      })
      .catch(error => console.error("Houve um erro ao criar o item:", error));
  };

  const handleRemove = (id) => {
    axios.delete(`${API_URL}/itens/${id}`)
      .then(response => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error("Houve um erro ao remover o item:", error);
      });
  };

  return (
    <AppContainer>
      <Title>Gerenciador de Itens</Title>

      <Card>
        <CardTitle>Adicionar Novo Item</CardTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome do item"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button type="submit">Adicionar Item</Button>
        </form>
      </Card>

      <Card>
        <CardTitle>Lista de Itens</CardTitle>
        <ItemList>
          {items.length > 0 ? (
            items.map(item => (
              <Item key={item._id}>
                <span><b>{item.nome}:</b> {item.descricao}</span>
                <RemoveButton onClick={() => handleRemove(item._id)}>Remover</RemoveButton>
              </Item>
            ))
          ) : (
            <p>Nenhum item adicionado ainda.</p>
          )}
        </ItemList>
      </Card>

    </AppContainer>
  );
}

export default App;