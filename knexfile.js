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
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/pplibrary_test',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/test'
    },
    useNullAsDefault: true,
  }
};
