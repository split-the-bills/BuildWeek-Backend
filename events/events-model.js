const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
  
};

function find() {
  return db('events')
}

function findBy(filter) {
  return db('events').where(filter);
}


async function add(event) {
  const [id] = await db('events').insert(event);

  return id;
}

function findById(id) {
  return db('events')
    .where({ id })
    .first();
}

