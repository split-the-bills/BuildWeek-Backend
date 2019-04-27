
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {event_name:'FarewellParty', description:'Friends Farewell Party',date:"04/01/2019",total_expenditure:50,paid_by:1},
        {event_name:'Lunch', description:'Friday lunch',date:"04/03/2019",total_expenditure:30,paid_by:2}
      ]);
    });
};


