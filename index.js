const express = require("express");

const app = express();

app.set("view engine", "ejs");

port = 4000;

const connection = require("./Database/Database");
const aluno = require("./Database/Aluno");
const aluno_turma = require("./Database/Ass_Aluno_turma");
const coordenador = require("./Database/Coordenador");
const curso = require("./Database/Curso");
const disciplina = require("./Database/Disciplina");
const disciplinaCursoVW = require("./Database/DisciplinaCursoVW");
const endereco = require("./Database/Endereco");
const frequencia = require("./Database/Frequencia");
const notas = require("./Database/Notas");
const pagamento = require("./Database/Pagamento");
const rep_financeiro = require("./Database/Rep_financeiro");
const status = require("./Database/Status_aprovacao");
const turma = require("./Database/Turma");
const valor_curso = require("./Database/Valor_curso");



connection
  .authenticate()
  .then(() => {
      console.log("Conexão feita!");
  })
  .catch((msgErro) => {
      console.log(msgErro);
  });

  const bodyParser = require("body-parser");
const Aluno = require("./Database/Aluno");
const Turma = require("./Database/Turma");
const Ass_aluno_turmaVW = require("./Database/Ass_Aluno_turmaVW");
const Ass_aluno_turma = require("./Database/Ass_Aluno_turma");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());



app.get("/disciplinas", (req, res) => {
  disciplina.findAll({
    raw: true,
    order: [
      ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  }).then((disciplinas) => {
    res.render("cad_disciplinas", {
      disciplinas: disciplinas,
    });
  });
});

// Rota para inserir dados na tabela
app.post("/editar_disciplina", async (req, res) => {
  const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
    req.body;
  const id = req.params.id;
  console.log(
    "****Dados disciplina: => ESTOU EM /editar_disciplina",
    nome_disciplina,
    carga_horaria,
    descricao_disciplina,
    action,
    id
  );
  // ESTA INCLUSÃO ESTÁ FUNCIONANDO
  if (action === "incluir") {
    try {
      //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
      const id = req.params.id;
      await Disciplina.create({
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
      });
      //res.status(201).json(disciplina);
      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
      });
    }
  }
  // A ALTERAÇÃO ESTÁ FUNCINANDO
  if (action === "alterar") {
    try {
      const {
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
        id_disciplina,
      } = req.body;
      const id = id_disciplina;
      //const id = req.params.id;
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
        });
      }
      disciplina.nome_disciplina = nome_disciplina;
      disciplina.carga_horaria = carga_horaria;
      disciplina.descricao_disciplina = descricao_disciplina;
      await disciplina.save();
      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
      });
    }
  }
});


// Rota para excluir dados da tabela
// ESTA FUNCIONA. iNCLUIR Mensagem de operação BEM SUCEDIDA.
app.post("/excluir_disciplina/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada." });
    }
    // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
    await Disciplina.destroy({
      where: {
        id_disciplina: id,
      },
    });
    res.redirect("/disciplinas");
    //res.json({ message: "Disciplina excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
}); 




app.listen(port, function (erro) {
  if (erro) {
    console.log(
      "Um erro ocorreu na tentativa de inicializar o servidor EXPRESS"
    );
  } else {
    console.log(
      `O servidor Express foi inicializado com sucesso! na porta http://127.0.0.1:${port})`
    );

    console.log(`Example app listening on port ${port}`);
  }
});












app.get("/aluno_turma", async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    const turmas = await Turma.findAll();
    const Ass_Aluno_turmas = await Ass_aluno_turma.findAll();
    const Ass_Aluno_turmaVWs = await Ass_aluno_turmaVW.findAll();
    res.render("cad_aluno_turma.ejs", {
      alunos,
      turmas,
      Ass_Aluno_turmas,
      Ass_Aluno_turmaVWs,
    });
  } catch (error) {
    console.error("Erro na busca de associações de turma aluno", error);
    res.status(500).send("Erro na busca de associações de turma aluno.");
  }
});


app.post("/editar_aluno_turma", async (req, res) => {
  try{
    const { aluno, turma, action} = req.body;

    if (action === "incluir") {
      await Ass_aluno_turma.create({
        aluno_id: aluno,
        turma_id: turma,
      });
      res.redirect("/aluno_turma");
    } else if (action === "alterar") {
      const Temporario = req.body.temporario;
      await Ass_aluno_turma.update(
        { aluno_id: aluno,turma_id: turma},
        {where: {Temporario}}
      );
      res.redirect("/aluno_turma");
    } else {
      res.status(400).send("!!!!");
    }
  } catch (error) {
    console.error("Erro na inserção ou editar associao turma aluno: ", error );
    res.status(500).send("error na inserção ou edição das associativa turma");
  }
});

app.post("/excluir_aluno_turma/:aluno_id/:turma_id", async (req, res) => {
  try {
    const aluno_id = req.params.aluno_id;
    const turma_id = req.params.turma_id;
    await Ass_aluno_turma.destroy({
      where: { aluno_id: aluno_id, turma_id: turma_id},
    });
    res.redirect("/aluno_turma");
  } catch (error) {
    console.error("error na exclusão de aluno turma: ",error);
    res.status(500).send("Erro na exclusão de aluno turma: ");
  }
});