const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const dbUtil = require('./test_script');
const q = `
    SELECT *
    FROM famous_people
    WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE UPPER($1)
    LIMIT 100;
  `;

dbUtil.query(q,[process.argv[2]], (err, result) => {
  if (err) {
    console.error(err)
  }
  console.log(`${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate.toISOString().split('T')[0]}'`)
  process.exit()
});