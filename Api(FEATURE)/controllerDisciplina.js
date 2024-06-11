app.get("/disciplina_curso", async (req, res) => {
    try {
      const cursos = await Curso.findAll();
      const disciplinas = await Disciplina.findAll();
  
      const disciplinaCursos = await DisciplinaCurso.findAll();
      res.render("cad_disciplina_curso", {
        disciplinaCursos,
        cursos,
        disciplinas,
      });
    } catch (error) {
      console.error("Erro ao buscar associações de disciplinas e cursos:", error);
      res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
    }
  });
  
  // Rota para inserir ou editar uma associação entre disciplina e curso
  // Rota para inserir ou editar uma associação entre disciplina e curso
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
      res.status(500).send("Erro ao inserir ou editar associação entre disciplina e curso.");
    }
  });
  
  
  // Rota para excluir uma associação entre disciplina e curso
  app.post("/excluir_disciplina_curso/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await DisciplinaCurso.destroy({ where: { id_disciplina_curso: id } });
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
  });