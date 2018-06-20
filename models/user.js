'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: { 
          args: true,
          msg: "FirstName Should be Null or undefined"
        },
        len: {
          args: [3,30],
          msg: "Invalid First Name"
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg: "FirstName should not contain any Number or symbols" 
        } 
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: { 
          args: true,
          msg: "FirstName Should be Null or undefined"
        },
        len: {
          args: [2,10],
          msg: "Invalid Last Name"
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg: "FirstName should not contain any Number or symbols" 
        } 
      }
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'EmailId must be unique.',
        fields: [sequelize.fn('lower', sequelize.col('emailId'))]
      },
      validate: { 
        notEmpty: { 
          args: true,
          msg: "EmailId Should be Null or undefined"
        },
        isEmail: {
          args: true,
          msg: "Invalid EmailId"
        }
       }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { 
        notEmpty: {
          args: true,
          msg: "Password should not be empty"
        }
       }
    },
  }, {});
  User.associate = function(models) {

    // associations can be defined here
  };
  return User;
};