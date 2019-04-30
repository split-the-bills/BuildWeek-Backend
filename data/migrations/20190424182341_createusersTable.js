exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("username", 255).notNullable();
    users.string("password", 255).notNullable();
    users.integer("phone").notNullable();
    users.string("email").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
