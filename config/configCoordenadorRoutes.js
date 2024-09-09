const express = require('express');
const app = express();
const coordenadorRoutes = require('./routes/coordenadorRoutes');
const { syncDisciplina } = require('./database/Disciplina'); // Certifique-se de que os caminhos estejam corretos

app.use(express.json()); // Para interpretar JSON no corpo das solicitações

// Configura as rotas
app.use('/coordenadores', coordenadorRoutes);

// Configura a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Sincronize os modelos com o banco de dados
  await syncDisciplina();
});
