
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'mia',password:'pass',phone:1234, email:"abcd"},
        {username:'tia',password:'pass',phone:1274, email:"bacd"},
        {username:'pia',password:'pass',phone:1284, email:"bccd"}
      ])
    });
};

