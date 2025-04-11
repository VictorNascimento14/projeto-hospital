const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Medico = require('./Medico');
const Paciente = require('./Paciente');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('AGENDADA', 'CONFIRMADA', 'CANCELADA', 'REALIZADA'),
    defaultValue: 'AGENDADA'
  },
  observacoes: {
    type: DataTypes.TEXT
  }
});

// Relacionamentos
Consulta.belongsTo(Medico, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
Consulta.belongsTo(Paciente, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

module.exports = Consulta; 