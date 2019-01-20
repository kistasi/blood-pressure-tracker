const express = require('express');
const bodyParser = require('body-parser');
const uuid_v1 = require('uuid/v1');
const mustacheExpress = require('mustache-express');
const models = require('./models');
const Result = models.Result;
const results = require('./controllers/results');

/* Config */
const port = process.env.PORT || 4000;

/* Initialize express.js */
const app = express();

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Template engine */
app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

/* Resources */
app.use(results);

/* Handle 404 */
app.use((request, response, next) => {
	response.render('notfound');
});

app.listen(port, () => console.log('Application is listening on port ' + port + '...'));
