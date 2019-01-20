module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Results', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      systolic: {
        type: Sequelize.STRING,
      },
      diastolic: {
        type: Sequelize.STRING,
      },
      pulse: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Results');
  }
};
