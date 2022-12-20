'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' })
      Message.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' })
    }
  }
  Message.init({
    content: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    beenSeen: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages',
    underscored: true,
  });
  return Message;
};