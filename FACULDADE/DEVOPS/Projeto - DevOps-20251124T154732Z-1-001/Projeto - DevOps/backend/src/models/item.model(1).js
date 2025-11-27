const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
});

module.exports = mongoose.model('Item', itemSchema);