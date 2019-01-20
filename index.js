const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require('sequelize');
const uuid_v1 = require('uuid/v1');
const mustacheExpress = require('mustache-express');

/* Config */
const port = 4000;
const database_file = './results.sqlite';

/* Create database schema */
const database = new sqlite3.Database(database_file);
database.run('CREATE TABLE IF NOT EXISTS results(id Integer, systolic Varchar, diastolic Varchar, pulse Varchar, createdAt Datetime, updatedAt Datetime);');

/* Database connection */
const sequelize = new Sequelize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: database_file,
});
sequelize.authenticate();

/* Defining the Result model */
const Result = sequelize.define('results', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	systolic: Sequelize.STRING,
	diastolic: Sequelize.STRING,
	pulse: Sequelize.STRING,
});

/* Initialize express.js */
const app = express();
app.listen(port, () => console.log('Application is listening on port ' + port + '...'));

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Template engine */
app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

/* Frontpage */
app.get('/', (request, response) => {
	Result.findAll({order: [ ['updatedAt', 'DESC']]}).then(results => {
		response.render('frontpage', {results: results});
	});
});

/* Add new result */
app.get('/new', (request, response) => {
	response.render('new', {action: 'save'});
});

/* Save the result */
app.post('/save', (request, response) => {
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
app.get('/delete/:id', (request, response) => {
	Result.destroy(
		{
			where: {
				id: request.params.id
			}
		}
	)
	.then(response.redirect('/'));
});

/* Handle 404 */
app.use((request, response, next) => {
	response.render('notfound');
});
