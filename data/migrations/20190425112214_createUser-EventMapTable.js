
exports.up = function(knex, Promise) {
    return knex.schema.createTable("maps",table=>{
        table.integer("event_id");//declaring the foreign key
        table.foreign("event_id")//using the foreign key,can'tgive semicolon here as it has not ended
             .references('id')
             .inTable("events");//on this table


        table.integer("user_id");//declaring the other foreign key
        table.foreign("user_id")//using the next foreign key
             .references('id')
             .inTable("users");
        table.primary(["event_id","user_id"],"id");
        table.float("to_pay",2).notNullable()

    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('maps')
  
};

