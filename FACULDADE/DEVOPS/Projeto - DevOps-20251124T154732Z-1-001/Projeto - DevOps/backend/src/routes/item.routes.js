const express = require('express');
const router = express.Router();
const Item = require('../models/item.model');

// GET: Buscar todos os itens
router.get('/itens', async (req, res) => {
  try {
    const itens = await Item.find();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

// POST: Criar um novo item
router.post('/itens', async (req, res) => {
  const novoItem = new Item({
    nome: req.body.nome,
    descricao: req.body.descricao,
  });

  try {
    const itemSalvo = await novoItem.save();
    res.status(201).json(itemSalvo);
  } catch (err) {
    res.status(400).json({ mensagem: err.message });
  }
});

// DELETE: Remover um item específico pelo seu ID
router.delete('/itens/:id', async (req, res) => {
  try {
    const itemRemovido = await Item.findByIdAndDelete(req.params.id);

    // Se o item com o ID fornecido não for encontrado, findByIdAndDelete retorna null.
    if (!itemRemovido) {
      return res.status(404).json({ mensagem: 'Item não encontrado' });
    }

    res.json({ mensagem: 'Item removido com sucesso' });
  } catch (err) {
    // Se ocorrer um erro no servidor (ex: problema com o banco de dados)
    res.status(500).json({ mensagem: err.message });
  }
});


module.exports = router;