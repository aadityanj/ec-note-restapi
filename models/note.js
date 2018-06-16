'use strict';
module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define('Note', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: id,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    title: DataTypes.STRING,
    notes: DataTypes.TEXT,
    status: DataTypes.ENUM(0,1)
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};