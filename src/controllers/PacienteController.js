const Paciente = require('../models/Paciente');
const { validationResult } = require('express-validator');

class PacienteController {
  // Listar todos os pacientes
  async index(req, res) {
    try {
      const pacientes = await Paciente.findAll();
      return res.json(pacientes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
  }

  // Buscar um paciente
  async show(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      return res.json(paciente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
  }

  // Criar um paciente
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const paciente = await Paciente.create(req.body);
      return res.status(201).json(paciente);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CPF ou email já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  }

  // Atualizar um paciente
  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }

      await paciente.update(req.body);
      return res.json(paciente);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CPF ou email já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  }

  // Deletar um paciente
  async destroy(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }

      await paciente.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
  }
}

module.exports = new PacienteController(); 