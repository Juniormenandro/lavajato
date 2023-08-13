// pages/api/oldClients.js
const mongoose = require('mongoose');
const Cliente = require('../../models/Cliente');  
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({updatedAt: -1});  
    res.status(200).json(clientes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao buscar os clientes antigos." });
  }
};
