const uuidV1 = require('uuid/v1');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Results',
      [
        {
          id: uuidV1(),
          systolic: '435',
          diastolic: '321',
          pulse: '234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          systolic: '122334',
          diastolic: '3232',
          pulse: '333',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          systolic: '1232334',
          diastolic: '3241',
          pulse: '444',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Results', null, {});
  },
};
