const Medico = require('../models/Medico');
const { validationResult } = require('express-validator');

class MedicoController {
  // Listar todos os médicos
  async index(req, res) {
    try {
      const medicos = await Medico.findAll();
      return res.json(medicos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar médicos' });
    }
  }

  // Buscar um médico
  async show(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      return res.json(medico);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar médico' });
    }
  }

  // Criar um médico
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const medico = await Medico.create(req.body);
      return res.status(201).json(medico);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CRM ou email já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao criar médico' });
    }
  }

  // Atualizar um médico
  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const medico = await Medico.findByPk(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }

      await medico.update(req.body);
      return res.json(medico);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CRM ou email já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao atualizar médico' });
    }
  }

  // Deletar um médico
  async destroy(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }

      await medico.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar médico' });
    }
  }
}

module.exports = new MedicoController(); 