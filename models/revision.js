'use strict';
module.exports = (sequelize, DataTypes) => {
  var Revision = sequelize.define('Revision', {
    noteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Note',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    revisedNote: DataTypes.TEXT,
    revisionName: DataTypes.STRING
  }, {});
  Revision.associate = function(models) {
    // associations can be defined here
  };
  return Revision;
};