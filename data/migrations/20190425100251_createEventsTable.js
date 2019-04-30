
exports.up = function(knex, Promise) {
 return   knex.schema.createTable("events",tbl=>{
        tbl.increments();
        tbl.string("event_name").notNullable();
        tbl.string("description")
        tbl.string('date').notNullable();
        tbl.float("total_expenditure",2).notNullable();
        tbl.integer("paid_by").notNullable();
        tbl.foreign("paid_by").references("id").inTable("users")
         

    })
    
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("events")
};


