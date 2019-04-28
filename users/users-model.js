const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

async function find() {
  return db("users");
}

async function findBy(filter) {
  return db("users").where(filter).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findBy({ id });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
