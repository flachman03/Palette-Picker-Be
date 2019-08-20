require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.set('port', process.env.NODE_ENV || 3000);

app.get('/', (request, response) => {
  response.send('Test')
})

app.get('/api/v1/projects', (request, response) => {
  database('projects')
    .select()
    .then(projects => response.status(200).json(projects))
    .catch(error => response.status(500).json({error}))
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palettes => response.status(200).json(palettes))
    .catch(error => response.status(500).json({error}))
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
  .then((project) => {
    response.status(200).json(project);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
  .then((palette) => {
    response.status(200).json(palette);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/projects', (request, response) => {
  const newProject = request.body;

    if(!newProject.title) {
      return response.status(422)
      .json({ Error: `Your new project was not added. You are missing the title property`})
    }

  database('projects').insert(newProject, 'id')
  .then(project => {
    response.status(201).json({ id: project[0] })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/palettes', (request, response) => {
  const newPalette = request.body;

  for(let requiredParameter of ['project_id', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5'])
    if(!newPalette[requiredParameter]) {
      return response.status(422)
      .json({ Error: `Your new project was not added. You are missing the ${requiredParameter} property`})
    }

  database('palettes').insert(newPalette, 'id')
  .then(palette => {
    response.status(201).json({ id: palette[0] })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get('port')}`)
})