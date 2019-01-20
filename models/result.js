const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define('Result',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        systolic: DataTypes.STRING,
        diastolic: DataTypes.STRING,
        pulse: DataTypes.STRING,
        },
        {
            getterMethods: {
                localizedCreatedAt: function () {
                    return moment(this.createdAt).format().substr(0, 10)
                }
            }
        }
    );

    Result.associate = models => {

    };

    return Result;
};
