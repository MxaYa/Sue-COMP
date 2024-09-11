import express from 'express';
import Aluno from "../database/Aluno.js";

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { nome, id_login, id_rep_financeiro, ativo, pagamento_curso } = req.body;
        const criar_aluno = await Aluno.create({
            nome,
            id_login,
            id_rep_financeiro,
            ativo,
            pagamento_curso,
        });
        res.status(201).json({ message: "Aluno criado com sucesso!", data: criar_aluno });
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar Aluno.", error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const rowsAluno = await Aluno.findAll({
            raw: true,
            order: [["id_aluno", "DESC"]],
        });
        if (rowsAluno.length === 0) {
            return res.status(404).json({ message: "Nenhum Registro de Aluno encontrado!" });
        }
        res.status(200).json({ message: "Alunos obtidos com sucesso!", data: rowsAluno });
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter Alunos.", error: error.message });
    }
});


router.get('/:id_aluno', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id_aluno);
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        res.status(200).json({ message: "Aluno obtido com sucesso!", data: aluno });
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter Aluno.", error: error.message });
    }
});


router.put('/:id_aluno', async (req, res) => {
    const { nome, id_login, id_rep_financeiro, ativo, pagamento_curso } = req.body;
    try {
        const [updated] = await Aluno.update(
            { nome, id_login, id_rep_financeiro, ativo, pagamento_curso },
            { where: { id_aluno: req.params.id_aluno }, returning: true, runValidators: true }
        );
        if (updated === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        const updatedAluno = await Aluno.findByPk(req.params.id_aluno);
        res.status(200).json({
            message: "Aluno atualizado com sucesso!",
            data: updatedAluno,
        });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar Aluno.", error: error.message });
    }
});


router.delete('/:id_aluno', async (req, res) => {
    try {
        const alunoDelet = await Aluno.destroy({
            where: { id_aluno: req.params.id_aluno },
        });
        if (alunoDelet === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }
        res.status(200).json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Aluno.", error: error.message });
    }
});

export default router;
