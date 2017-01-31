const settings = require("./settings");
const test_script = require('./test_script');

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

const first = process.argv[2];
const last = process.argv[3];
const date = process.argv[4];

knex('famous_people').insert([{first_name: first, last_name: last, birthdate: date}]).then(function(result) {
    console.log(result)
    process.exit();
  });