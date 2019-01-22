const results = require('express').Router();
const uuidV1 = require('uuid/v1');
const models = require('./../models');

/* Frontpage */
results.get('/', (request, response) => {
  models.Result.findAll({ order: [['updatedAt', 'DESC']] }).then(results => {
    response.render('frontpage', { results });
  });
});

/* Add new result */
results.get('/new', (request, response) => {
  response.render('new', { action: 'save' });
});

/* Save the result */
results.post('/save', async (request, response) => {
  const result = models.Result.build(
    {
      id: uuidV1(),
      systolic: request.body.systolic,
      diastolic: request.body.diastolic,
      pulse: request.body.pulse,
    },
  );

  await result.save();
  response.redirect('/');
});

/* Delete a result */
results.get('/delete/:id', async (request, response) => {
  await models.Result.destroy(
    {
      where: {
        id: request.params.id,
      },
    },
  );

  response.redirect('/');
});

module.exports = results;
