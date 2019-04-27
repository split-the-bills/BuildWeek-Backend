const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

async function find() {
  return db("maps");
}

async function findBy(filter) {
  return db("maps").where(filter);
}

async function add(map) {
  const [id] = await db("maps").insert(map);

  return id;
}

function findById(id) {
  return db("maps")
    .where({ id })
    .first();
}
