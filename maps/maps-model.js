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
  return db
    .select(
      "event_id",
      "user_id",
      "to_pay",
      "event_name",
      "paid_by",
      "username",
      "email"
    )
    .from("maps")
    .where(filter)
    .innerJoin("events", "maps.event_id", "=", "events.id")
    .innerJoin("users", "users.id", "=", "events.paid_by");
}

// getProject:(id)=>{
//   console.log("Get project ", id)
//   return db.select("projects.id","project_name","project_description","project_completed").from("projects").
//     where("projects.id", id);

// },
// getProjectWithAction:(id)=>{
//  console.log("With actions",id)
//  return db.select("projects.id","project_name","project_description","project_completed")
//  .from("projects").where("id",id)
// },

async function add(map) {
  const [id] = await db("maps").insert(map);

  return id;
}

function findById(id) {
  return db("maps")
    .where({ id })
    .first();
}
