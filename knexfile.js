// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost:/pplibrary'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },


  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL + `ssl=true`,
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  }
};
