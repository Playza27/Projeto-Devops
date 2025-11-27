const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/item.routes');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json()); // Essencial para parsear o corpo de requisições JSON

// Conexão com o MongoDB
// 'mongodb' é o nome do serviço do banco de dados no docker-compose.yml
const dbURI = 'mongodb://mongodb:27017/minhadb';
mongoose.connect(dbURI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas da API
app.use('/api', itemRoutes);

app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});