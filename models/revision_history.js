'use strict';
module.exports = (sequelize, DataTypes) => {
  var Revision_History = sequelize.define('Revision_History', {
    revisionId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Revision',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    history: DataTypes.JSON
  }, {});
  Revision_History.associate = function(models) {
    // associations can be defined here
  };
  return Revision_History;
};