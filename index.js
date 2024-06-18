const express = require("express"); 

const app = express();

app.set("view engine", "ejs");

port = 1046;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config({ path: "./.env" });
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);


const connection = require("./database/database");

const Ass_aluno_turmaVW = require("./database/Ass_Aluno_turmaVW");

const Aluno = require("./database/Aluno");

const Ass_aluno_turma = require("./database/Ass_Aluno_turma");

const Coordenador = require("./database/Coordenador");

const Curso = require("./database/Curso");

const Disciplina = require("./database/Disciplina"); 

const DisciplinaCurso = require("./database/DisciplinaCurso");

const Endereco = require("./database/enderecos");

const Frequencia = require("./database/Frequencia");

const Notas = require("./database/Notas");

const Pagamento = require("./database/Pagamento");

const Rep_financeiro = require("./database/Rep_financeiro");

const Turma = require("./database/Turma");

const Usuario = require("./database/Usuario");

const Valor_curso = require("./database/Valor_curso");

const DisciplinaCursoVW = require("./database/DisciplinaCursoVW");
const Professor = require("./database/professor");
const res = require("express/lib/response");



//DisciplinaCursoTable = DisciplinaCursoVW.sincronizarDisciplinaCursoVW();

/*alunotable = Aluno.syncAluno();
AssAT = Ass_aluno_turma.syncAss_Aluno_turma();
coordenadorTable = Coordenador.syncCoordenador();
cursotable = Curso.syncCurso();
disciplinatable = Disciplina.syncDisciplina();
DisciplinaCursoTable = DisciplinaCurso.sincronizarDisciplinaCurso();
DCVW = DisciplinaCursoVW.sincronizarDisciplinaCursoVW();
Enderecotable = Endereco.syncendereco();
frequenciatable = Frequencia.syncFrenquencia();
notastable = Notas.syncNotas();
pagamentotable = Pagamento.syncPagamento();
repfinanceiroTable = Rep_financeiro.syncRep_financeiro();
StatusTable = Status_aprovacao.syncStatus_aprovacao();
turmaTable = Turma.syncTurma();
usuariotable = Usuario.syncUsuario();
VC_table = Valor_curso.syncValor_curso();
/*enderecoTable = endereco.syncendereco();

status_de_aprovacaoTable = status_de_aprovacao.syncStatus();

cursoTable = curso.syncCurso();*/

//disciplinacurso = Disciplina.syncDisciplina();

connection
  .authenticate()
  .then(() => {
      console.log("Conexão feita!");
  })
  .catch((msgErro) => {
      console.log(msgErro);
  });

app.get("/", (req, res) => {
  res.render("main");
});


app.get("/disciplinas", (req, res) => {
    Disciplina.findAll({
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
  
  

  app.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, valor_disciplina, descricao_disciplina, action } =
      req.body;
    const id = req.params.id;
    console.log(
      "****Dados disciplina: => ESTOU EM /editar_disciplina",
      nome_disciplina,
      valor_disciplina,
      descricao_disciplina,
      action,
      id
    );

    if (action === "incluir") {
      try {
        //const { nome_disciplina, valor_disciplina, descricao_disciplina } = req.body;
        const id = req.params.id;
        await Disciplina.create({
          nome_disciplina,
          valor_disciplina,
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

    if (action === "alterar") {
      try {
        const {
          nome_disciplina,
          valor_disciplina,
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
        disciplina.valor_disciplina = valor_disciplina;
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
  

  app.post("/excluir_disciplina/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }

      await Disciplina.destroy({
        where: {
          id_disciplina: id,
        },
      });
      res.redirect("/disciplinas");
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      res
        .status(500)
        .json({ error: "Erro ao excluir dados da tabela de disciplina." });
    }
  });


app.get("/disciplina_curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();
    const disciplinaCursos = await DisciplinaCurso.findAll();
    const disciplinaCursosVW = await DisciplinaCursoVW.findAll();
    res.render("cad_disciplina_curso.ejs", {
      disciplinaCursos,
      cursos,
      disciplinas,
      disciplinaCursosVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});


app.post("/editar_disciplina_curso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_curso: curso,
        id_disciplina: disciplina,
      });
      res.redirect("/disciplina_curso");
    } else if (action === "alterar") {
      const id_disciplina_curso = req.body.id_disciplina_curso;
      await DisciplinaCurso.update(
        { id_curso: curso, id_disciplina: disciplina },
        { where: { id_disciplina_curso } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

app.post(
  "/excluir_disciplina_curso/:id_curso/:id_disciplina",
  async (req, res) => {
    try {
      const id_curso = req.params.id_curso;
      const id_disciplina = req.params.id_disciplina;
      await DisciplinaCurso.destroy({
        where: { id_curso: id_curso, id_disciplina: id_disciplina },
      });
      res.redirect("/disciplina_curso");
    } catch (error) {
      console.error(
        "Erro ao excluir associação entre disciplina e curso:",
        error
      );
      res
        .status(500)
        .send("Erro ao excluir associação entre disciplina e curso.");
    }
  }
);




//----------------------------------------------------------------------------
app.get("/coordenadores", (req, res) => {
  Coordenador.findAll({
    raw: true,
    order: [
      ["id_coordenador", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  }).then((coordenador) => {
    res.render("cad_coord", {
      coordenadores: coordenador,
    });
  });
});


app.post("/criar_coordenador", async (req, res) => {
  const { usuario, unidade} = req.body;
  try {
    await Coordenador.create({
      usuario,
      unidade,
    });
    res.status(201).redirect("/coordenadores");
  } catch (error) {
    console.error("Erro ao criar coordenador:", error);
    res.status(500).json({ error: "Erro ao criar coordenador." });
  }
});


app.post("/editar_coordenador/:id", async (req, res) => {
  const { usuario, unidade} = req.body;
  try {
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ error: "Coordenador não encontrado." });
    }
    coordenador.usuario = usuario;
    coordenador.unidade = unidade;
    await coordenador.save();
    res.status(201).redirect("/coordenadores");
  } catch (error) {
    console.error("Erro ao editar coordenador:", error);
    res.status(500).json({ error: "Erro ao editar coordenador." });
  }
});


app.post("/excluir_coordenador/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ error: "Coordenador não encontrado." });
    }
    await Coordenador.destroy({
      where: {
        id_coordenador: id,
      },
    });
    res.redirect("/coordenadores");
  } catch (error) {
    console.error("Erro ao excluir coordenador:", error);
    res.status(500).json({ error: "Erro ao excluir coordenador." });
  }
});

//---------------------------------------------------------
app.get("/cursos", (req, res) => {
  Curso.findAll({
    raw: true,
  }).then((cursos) => {
    res.render("cad_curso", {
      cursos: cursos,
    });
  });
});


app.post("/criar_curso", async (req, res) => {
  const { nome_curso, descricao_curso } = req.body;
  try {
    await Curso.create({
      nome_curso,
      descricao_curso,
    });
    res.status(201).redirect("/cursos");
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    res.status(500).json({ error: "Erro ao criar curso." });
  }
});


app.post("/editar_curso/:id", async (req, res) => {
  const { nome_curso, descricao_curso } = req.body;
  const id = req.params.id;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }
    curso.nome_curso = nome_curso;
    curso.descricao_curso = descricao_curso;
    await curso.save();
    res.status(201).redirect("/cursos");
  } catch (error) {
    console.error("Erro ao editar curso:", error);
    res.status(500).json({ error: "Erro ao editar curso." });
  }
});

app.post("/excluir_curso/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }
    await curso.destroy();
    res.redirect("/cursos");
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    res.status(500).json({ error: "Erro ao excluir curso." });
  }
});

//-----------------------------------------------------------------------------

app.get("/frequencias", (req, res) => {
  Frequencia.findAll({
    raw: true,
  }).then((Frenquencia) => {
    res.render("cad_frequencia", {
      Frequencia: Frequencia,
    });
  });
});


app.post("/criar_frequencia", async (req, res) => {
  const { data_Frequencia, Frequencia } = req.body;
  try {
    await Frequencia.create({
      data_Frequencia,
      presente
    });
    res.status(201).redirect("/frequencias");
  } catch (error) {
    console.error("Erro ao criar frequência:", error);
    res.status(500).json({ error: "Erro ao criar frequência." });
  }
});


app.post("/editar_frequencia/:id", async (req, res) => {
  const { data_Frequencia, Frequencia } = req.body;
  const id = req.params.id;
  try {
    const Frequencia = await Frequencia.findByPk(id);
    if (!Frequencia) {
      return res.status(404).json({ error: "Frequência não encontrada." });
    }
    Frequencia.data_Frequencia = data_Frequencia;
    Frequencia.presente = Frequencia;
    await Frequencia.save();
    res.status(201).redirect("/frequencias");
  } catch (error) {
    console.error("Erro ao editar frequência:", error);
    res.status(500).json({ error: "Erro ao editar frequência." });
  }
});

app.post("/excluir_frequencia/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Frequencia = await Frequencia.findByPk(id);
    if (!Frequencia) {
      return res.status(404).json({ error: "Frequência não encontrada." });
    }
    await Frequencia.destroy();
    res.redirect("/frequencias");
  } catch (error) {
    console.error("Erro ao excluir frequência:", error);
    res.status(500).json({ error: "Erro ao excluir frequência." });
  }
});

//--------------------------------------------------------------------------------


app.get("/notas", (req, res) => {
  Notas.findAll({
    raw: true,
  }).then((notas) => {
    res.render("cad_nota", {
      notas: notas,
    });
  });
});


app.post("/criar_nota", async (req, res) => {
  const { descricao_da_nota, valor_nota, data_da_nota } = req.body;
  try {
    await Notas.create({
      descricao_da_nota,
      valor_nota,
      data_da_nota
    });
    res.status(201).redirect("/notas");
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    res.status(500).json({ error: "Erro ao criar nota." });
  }
});


app.post("/editar_nota/:id_notas", async (req, res) => {
  const { descricao_da_nota, valor_nota, data_da_nota } = req.body;
  const id_notas = req.params.id_notas;
  try {
    const nota = await Notas.findByPk(id_notas);
    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada." });
    }
    nota.descricao_da_nota = descricao_da_nota;
    nota.valor_nota = valor_nota;
    nota.data_da_nota = data_da_nota;
    await nota.save();
    res.status(201).redirect("/notas");
  } catch (error) {
    console.error("Erro ao editar nota:", error);
    res.status(500).json({ error: "Erro ao editar nota." });
  }
});


app.post("/excluir_nota/:id_notas", async (req, res) => {
  const id_notas = req.params.id_notas;
  try {
    const nota = await Notas.findByPk(id_notas);
    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada." });
    }
    await nota.destroy();
    res.redirect("/notas");
  } catch (error) {
    console.error("Erro ao excluir nota:", error);
    res.status(500).json({ error: "Erro ao excluir nota." });
  }
});

//------------------------------------------------------------------------------

app.get("/pagamentos", (req, res) => {
  Pagamento.findAll({
    raw: true,
  }).then((pagamento) => {
    res.render("cad_pagamentos", {
      pagamento: pagamento,
    });
  });
});


app.post("/criar_pagamento", async (req, res) => {
  const { valor_pago, data_pago, descricao, tipo_desconto, numero_parcela } = req.body;
  try {
    await Pagamento.create({
      valor_pago,
      data_pago,
      descricao,
      tipo_desconto,
      numero_parcela
    });
    res.status(201).redirect("/pagamentos");
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro ao criar pagamento." });
  }
});


app.post("/editar_pagamento/:id_pagamento", async (req, res) => {
  const { valor_pago, data_pago, descricao, tipo_desconto, numero_parcela } = req.body;
  const id_pagamento = req.params.id_pagamento;
  try {
    const pagamento = await Pagamento.findByPk(id_pagamento);
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado." });
    }
    pagamento.valor_pago = valor_pago;
    pagamento.data_pago = data_pago;
    pagamento.descricao = descricao;
    pagamento.tipo_desconto = tipo_desconto;
    pagamento.numero_parcela = numero_parcela;
    await pagamento.save();
    res.status(201).redirect("/pagamentos");
  } catch (error) {
    console.error("Erro ao editar pagamento:", error);
    res.status(500).json({ error: "Erro ao editar pagamento." });
  }
});


app.post("/excluir_pagamento/:id_pagamento", async (req, res) => {
  const id_pagamento = req.params.id_pagamento;
  try {
    const pagamento = await Pagamento.findByPk(id_pagamento);
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado." });
    }
    await pagamento.destroy();
    res.redirect("/pagamentos");
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
    res.status(500).json({ error: "Erro ao excluir pagamento." });
  }
});


//------------------------------------------------------------------------------ Professor

app.get("/professores", (req, res) => {
  Professor.findAll({
    raw: true,
    order: [["id_professor", "DESC"]],
  })
    .then((professores) => {
        res.render("cad_professores", { professores: professores });

    })
    .catch((err) => {
      console.error("Erro ao buscar professores:", err);
      res.status(500).send("Erro interno ao buscar professores");
    });
});


app.post("/editar_professor", async (req, res) => {
    const { nome, login_id, area_de_ensino, id_professor } = req.body;
    console.log("Dados recebidos:", nome, login_id, area_de_ensino, id_professor);
  
    try {
      if (id_professor) {
        
        const professor = await Professor.findByPk(id_professor);
        if (professor) {
          professor.nome = nome;
          professor.login_id = login_id;
          professor.area_de_ensino = area_de_ensino;
          await professor.save();
        }
      } else {
        
        await Professor.create({ nome, login_id, area_de_ensino });
      }
      res.redirect("/professores");
    } catch (error) {
      console.error("Erro ao editar/inserir professor:", error);
      res.status(500).send("Erro interno ao editar/inserir professor");
    }
  });
  

app.post("/excluir_professor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }
    await Professor.destroy({ where: { id_professor: id } });
    res.redirect("/professores");
  } catch (error) {
    console.error("Erro ao excluir professor:", error);
    res.status(500).send("Erro interno ao excluir professor");
  }
});

//------------------------------------------------------------------------------ Professor
app.get("/rep_financeiro", (req, res) => {
  Rep_financeiro.findAll({
    raw: true,
  }).then((financeiros) => {
    res.render("cad_repFinanceiro", {
      financeiros: financeiros,
    });
  });
});

app.post("/criar_financeiro", async (req, res) => {
  const { login_id, data_transacao, descricao } = req.body;
  try { 
    await Rep_financeiro.create({
      login_id,
      data_transacao,
      descricao,
    });
    res.status(201).redirect("/rep_financeiro");
  } catch (error) {
    console.error("Erro ao criar Representante Financeiro:", error);
    res.status(500).json({ error: "Erro ao criar  Representante Financeiro." });
  }
});


app.post("/editar_representante/:id_rep_financeiro", async (req, res) => {
  const { login_id, data_transacao, descricao } = req.body;
  const id_rep_financeiro = req.params.id_rep_financeiro;
  try {
    const rep_financeiro = await Professor.findByPk(id_rep_financeiro);
    if (!rep_financeiro) {
      return res.status(404).json({ error: "Representante Financeiro não encontrado." });
    }
    rep_financeiro.login_id = login_id;
    rep_financeiro.data_transacao = data_transacao;
    rep_financeiro.descricao = descricao;

    await professor.save();
    res.status(201).redirect("/rep_financeiro");
  } catch (error) {
    console.error("Erro ao editar professores:", error);
    res.status(500).json({ error: "Erro ao editar Representante Financeiro." });
  }
});

app.post("/excluir_representante/:id_rep_financeiro", async (req, res) => {
  const id_rep_financeiro = req.params.id_rep_financeiro;
  try {
    const rep_financeiro = await Professor.findByPk(id_rep_financeiro);
    if (!rep_financeiro) {
      return res.status(404).json({ error: "Representante Financeiro não encontrado." });
    }
    await rep_financeiro.destroy();
    res.redirect("/rep_financeiro");
  } catch (error) {
    console.error("Erro ao excluir Representante Financeiro:", error);
    res.status(500).json({ error: "Erro ao excluir Representante Financeiro." });
  }
});
  //------------------------------------------------------------------------------
  app.get("/status_aprovacao", (req, res) => {
    Status_aprovacao.findAll({
      raw: true,
    }).then((statusAprov) => {
      res.render("cad_statusAprovacao", {
        statusAprov: statusAprov,
      });
    });
  });

  app.post("/criar_status", async (req, res) => {
    const { status } = req.body;
    try { 
      await Status_aprovacao.create({
        status,
      
      });
      res.status(201).redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao criar o Status:", error);
      res.status(500).json({ error: "Erro ao criar  Status." });
    }
  });

  app.post("/editar_status/:id_status", async (req, res) => {
    const { status} = req.body;
    const id_status = req.params.id_status;
    try {
      const status_aprovacao = await Professor.findByPk(id_status);
      if (!status_aprovacao) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      status_aprovacao.status = status;
      
  
      await professor.save();
      res.status(201).redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao editar Status:", error);
      res.status(500).json({ error: "Erro ao editar Status ." });
    }
  });

  app.post("/excluir_status/:id_status", async (req, res) => {
    const id_status = req.params.id_status;
    try {
      const status_aprovacao = await Status_aprovacao.findByPk(id_status);
      if (!status_aprovacao) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      await status_aprovacao.destroy();
      res.redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao excluir Status:", error);
      res.status(500).json({ error: "Erro ao Statgus." });
    }
  });
  //------------------------------------------------------------------------------
  
  app.get("/status_aprovacao", (req, res) => {
    Status_aprovacao.findAll({
      raw: true,
    }).then((statusAprov) => {
      res.render("cad_statusAprovacao", {
        statusAprov: statusAprov,
      });
    });
  });

  app.post("/criar_status", async (req, res) => {
    const { status } = req.body;
    try { 
      await Status_aprovacao.create({
        status,
      
      });
      res.status(201).redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao criar o Status:", error);
      res.status(500).json({ error: "Erro ao criar  Status." });
    }
  });

  app.post("/editar_status/:id_status", async (req, res) => {
    const { status} = req.body;
    const id_status = req.params.id_status;
    try {
      const status_aprovacao = await Professor.findByPk(id_status);
      if (!status_aprovacao) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      status_aprovacao.status = status;
      
  
      await professor.save();
      res.status(201).redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao editar Status:", error);
      res.status(500).json({ error: "Erro ao editar Status ." });
    }
  });

  app.post("/excluir_status/:id_status", async (req, res) => {
    const id_status = req.params.id_status;
    try {
      const status_aprovacao = await Status_aprovacao.findByPk(id_status);
      if (!status_aprovacao) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      await status_aprovacao.destroy();
      res.redirect("/status_aprovacao");
    } catch (error) {
      console.error("Erro ao excluir Status:", error);
      res.status(500).json({ error: "Erro ao Statgus." });
    }
  });
//------------------------------------------------------------------------------

  app.get("/usuario", (req, res) => {
    Usuario.findAll({
      raw: true,
    }).then((usuarios) => {
      res.render("cad_usuario ", {
        usuarios: usuarios,
      });
    });
  });

  app.post("/criar_usuario", async (req, res) => {
    const { nome, telefone, email, cpf, endereco_id } = req.body;
    try { 
      await Usuario.create({
        nome, 
        telefone, 
        email, 
        cpf, 
        endereco_id,
      
      });
      res.status(201).redirect("/usuario");
    } catch (error) {
      console.error("Erro ao criar o Usuario:", error);
      res.status(500).json({ error: "Erro ao criar  Status." });
    }
  });

  app.post("/editar_usuario/:id_usuario", async (req, res) => {
    const { nome, telefone, email, cpf, endereco_id} = req.body;
    const id_usuario = req.params.id_usuario;
    try {
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      usuario.nome = nome;
      usuario.telefone = telefone;
      usuario.email = email;
      usuario.cpf = cpf;
      usuario.endereco_id = endereco_id;
      
  
      await usuario.save();
      res.status(201).redirect("/usuarios");
    } catch (error) {
      console.error("Erro ao editar usuarios:", error);
      res.status(500).json({ error: "Erro ao editar usuarios ." });
    }
  });

  app.post("/excluir_usuarios/:id_usuario", async (req, res) => {
    const id_usuario = req.params.id_usuario;
    try {
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        return res.status(404).json({ error: "Representante Financeiro não encontrado." });
      }
      await usuario.destroy();
      res.redirect("/usuarios");
    } catch (error) {
      console.error("Erro ao excluir usuarios:", error);
      res.status(500).json({ error: "Erro ao usuarios." });
    }
  });

//--------------------------------------------------------------------------------

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
        id_aluno: aluno,
        id_turma: turma,
      });
      res.redirect("/aluno_turma");
    } else if (action === "alterar") {
      const id_aluno_turma = req.body.temporario;
      await Ass_aluno_turma.update(
        { id_aluno: aluno,id_turma: turma},
        {where: {id_aluno_turma}}
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

app.post("/excluir_aluno_turma/:id_aluno/:id_turma", async (req, res) => {
  try {
    const id_aluno = req.params.id_aluno;
    const id_turma = req.params.id_turma;
    await Ass_aluno_turma.destroy({
      where: { id_aluno: id_aluno, id_turma: id_turma},
    });
    res.redirect("/aluno_turma");
  } catch (error) {
    console.error("error na exclusão de aluno turma: ",error);
    res.status(500).send("Erro na exclusão de aluno turma: ");
  }
});
//---------------------------------------------------------------------------
app.get("/enderecos", (req, res) => {
  console.log("Iniciando busca de endereços...");
  Endereco.findAll({
    raw: true,
    order: [["id_endereco", "DESC"]],
  })
    .then((enderecos) => {
      console.log("Endereços encontrados:", enderecos);
      res.render("cad_enderecos", { enderecos: enderecos });
    })
    .catch((err) => {
      console.error("Erro ao buscar endereços:", err);
      res.status(500).send("Erro interno ao buscar endereços");
    });
});

// Rota para inserir ou editar endereços
app.post("/editar_endereco", async (req, res) => {
  const { rua, bairro, cidade, estado, pais, cep, id_endereco } = req.body;

  try {
    if (id_endereco) {
      // Editar endereço existente
      const endereco = await Endereco.findByPk(id_endereco);
      if (endereco) {
        endereco.rua = rua;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.pais = pais;
        endereco.cep = cep;
        await endereco.save();
      }
    } else {
      // Criar novo endereço
      await Endereco.create({ rua, bairro, cidade, estado, pais, cep });
    }
    res.redirect("/enderecos");
  } catch (error) {
    console.error("Erro ao editar/inserir endereço:", error);
    res.status(500).send("Erro interno ao editar/inserir endereço");
  }
});

// Rota para excluir endereços
app.post("/excluir_endereco/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const endereco = await Endereco.findByPk(id);
    if (!endereco) {
      return res.status(404).json({ error: "Endereço não encontrado." });
    }
    await Endereco.destroy({ where: { id_endereco: id } });
    res.redirect("/enderecos");
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    res.status(500).send("Erro interno ao excluir endereço");
  }
});





//isso sempre tem q ficar no fim do codigo  
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

  //as2d31as23d1a
});

