const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
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
app.set('views', [__dirname, '/views'].join(''));

/* Resources */
app.use(results);

/* Handle 404 */
app.use((request, response) => {
  response.render('notfound');
});

app.listen(port, () => console.log(`Application is listening on port ${port}...`));
