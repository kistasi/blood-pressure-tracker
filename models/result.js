const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define(
    'Result',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      systolic: {
        type: DataTypes.STRING,
      },
      diastolic: {
        type: DataTypes.STRING,
      },
      pulse: {
        type: DataTypes.STRING,
      },
    },
    {
      getterMethods: {
        localizedCreatedAt: function () {
          return moment(this.createdAt).format().substr(0, 10);
        }
      },
    },
  );

  return Result;
};
