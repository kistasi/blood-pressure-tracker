const results = require('express').Router();
const uuid_v1 = require('uuid/v1');
const models = require('./../models');
const Result = models.Result;

/* Frontpage */
results.get('/', (request, response) => {
	Result.findAll({order: [['updatedAt', 'DESC']]}).then(results => {
		response.render('frontpage', { results })
	});
});

/* Add new result */
results.get('/new', (request, response) => {
	response.render('new', {action: 'save'});
});

/* Save the result */
results.post('/save', (request, response) => {
	const result = Result.build(
		{
			id: uuid_v1(),
			systolic: request.body.systolic,
			diastolic: request.body.diastolic,
			pulse: request.body.pulse,
		}
	);

	result.save();
	response.redirect('/');
});

/* Delete a result */
results.get('/delete/:id', (request, response) => {
	Result.destroy(
		{
			where: {
				id: request.params.id
			}
		}
	)
	.then(response.redirect('/'));
});

module.exports = results;
