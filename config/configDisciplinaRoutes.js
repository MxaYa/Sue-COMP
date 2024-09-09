
/**
 * Rotas de disciplinaController
 */
const express = require('express');
const app = express();
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const { syncDisciplina } = require('./models/Disciplina'); // Sincroniza o modelo com o banco de dados

app.use(express.json()); // Para interpretar JSON no corpo das solicitações

// Configura as rotas
app.use('/disciplinas', disciplinaRoutes);

// Configura a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Sincronize os modelos com o banco de dados
  await syncDisciplina();
});
