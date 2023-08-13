// models/Cliente.js
const mongoose = require('mongoose');

const ServicoSchema = new mongoose.Schema({
    carro: String,
    nome: String,
    preco: {
        type: Number,
        required: true,
        default: 0, 
      },
    pagamento: {
        type: String,
        enum: ['CASH', 'CARD', 'REVOLUT', 'ONLINE'],
    },
    data: Date,
    concluido: {type: Boolean, default: false},
    aguardandoPagamento: { type: Boolean, default: true },
    horaInicio: Date,
    horaFinal: Date,
    modeloCarro: String, 
    corCarro: String, 
    funcionario: String, 
    tempoRestante: String 
});

const ClienteSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    servicos: [ServicoSchema]
}, {
    timestamps: true
});


if (mongoose.models.Cliente) {
    module.exports = mongoose.model('Cliente');
  } else {
    module.exports = mongoose.model('Cliente', ClienteSchema);
  }

