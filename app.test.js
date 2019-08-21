const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    })
  })
})
describe('API', () => {
  describe('GET /api/v1/projects', () => {
    it('should return a status of 200 and all projects', async () => {
      const expectedProjects = await database('projects').first()
        .then(project => [project.title, project.id])

      const response = await request(app).get('/api/v1/projects')
      const project = response.body[0]

      expect(response.status).toBe(200)
      expect([project.title, project.id]).toEqual(expectedProjects)
    })
  })
  describe('GET /api/v1/palettes', () => {
    it('should return a status of 200 and all palettes', async () => {
      const expectedPallete = await database('palettes').first()
        .then(palette => [palette.id, palette.project_id, palette.color_1, palette.color_2, palette.color_3, palette.color_4, palette.color_5])
      const response = await request(app).get('/api/v1/palettes')
      const palette = response.body[0]
      const testedPalette = [palette.id, palette.project_id, palette.color_1, palette.color_2, palette.color_3, palette.color_4, palette.color_5]

      expect(response.status).toBe(200)
      expect(testedPalette).toEqual(expectedPallete)
    })
  })
  describe('GET /api/v1/projects/:id', () => {
    it('should return a status of 200 and one project by its id', async () => {
      const expectedProjectId = await database('projects').first()
        .then(project => project.id)
      
      const response = await request(app).get('/api/v1/projects/1')
      const project = response.body.id

      expect(response.status).toBe(200)
      expect(project).toEqual(expectedProjectId)
    })

    it('should return a 404 error if cannot find project by id', async () => {
      const expected = 'ERROR: Cannot find project id'

      const response = await request(app).get('/api/v1/projects/4')
      const project = response.body

      expect(response.status).toBe(404)
      expect(project).toEqual(expected)
    })
  })
})
