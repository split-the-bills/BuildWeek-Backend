
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {event_id:1,user_id:1,to_pay:25.00},
        {event_id:1,user_id:2,to_pay:25.00},
        
      ]);
    });
};
