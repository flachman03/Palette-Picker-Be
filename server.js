const app = require('./app')

app.set('port', process.env.NODE_ENV || 3000);


app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get('port')}`)
})