import express from 'express';
import connection from './database/database.js';
import disciplinaRoutes from './Controllers/disciplinaControl.js';
import D_curso from './Controllers/Disciplina_cursoControl.js';
import coordenadorRoutes from './Controllers/coordenadorControl.js';
import dotenv from 'dotenv'; // Importar dotenv

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
app.use(express.json());

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

/* app.get("/", (req, res) => {
    res.render("main");
}); */
/* 
app.post('/disciplinas', (req, res) => {
    res.send('ok funfa')
}); */

app.use('/DisciplinaCurso', D_curso);
app.use('/coordenador', coordenadorRoutes);
app.use('/disciplinas', disciplinaRoutes);

const PORT = process.env.PORT || 3000; // Usar a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
