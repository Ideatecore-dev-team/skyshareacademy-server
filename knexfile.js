const dotenv = require("dotenv");
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
// console.log(databaseUrl);
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: databaseUrl,
    },
    pool: {
      min: 1,
      max: 15,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    // for debug database, must comment or delete if in production
    // debug: true,
    // log: {
    //   warn: (message) => {
    //     logger.warn("Knex warn: ", message);
    //   },
    //   error: (message) => {
    //     logger.error("Knex error: ", message);
    //   },
    //   deprecate: (message) => {
    //     logger.info("Knex deprecate: ", message);
    //   },
    //   debug: (message) => {
    //     logger.info("Knex debug: ", message);
    //   },
    // },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
