const router = require("express").Router();
const eventDB = require("./events-model.js");
const Users = require("../users/users-model");
const mapsDB = require("../maps/maps-model.js");

router.post("/", async (req, res) => {
  //1. Check if event has all properties reauired

  //2. Find id of the user paid_by event.paid_by
  // const user = userDB.findBy({event.paid_by}).
  // Check user should exist if
  // event.paid_by = user.id
  //email is a unique thing and a correct measure to identify

  try {
    const event = req.body;
    console.log("Got event ", event);
    if (
      event.event_name &&
      event.date &&
      event.total_expenditure &&
      event.paid_by &&
      event.participants &&
      event.participants.length != 0
    ) {
      // We have got all required field. Now check if paid_by is a valid user in our user table.
      // If not, set error and return.
      //Users.findBy returns array of user objects
      //email is a column name .
      const users = await Users.findBy({ email: event.paid_by });

      if (!users || users.length == 0) {
        res.status(400).json({ message: "Invalid paid by user ..." });
        return;
      }
      user = users[0];

      //We found valid user, replace its id by email from request.
      console.log("THE PERSON WHO PAID IS:", user);
      event.paid_by = user.id;
      console.log("THE PERSON WHO PAID IS:", user.id);

      //Look up each participants in user table, and make sure they are valid.
      // Produce list of ids//let ids  = []
      //for loop
      let ids = [];
      //event.participants is an array of emails of users participated in a particular event
      const participants = event.participants;
      console.log("Participants ", participants);
      for (let i = 0; i < event.participants.length; i++) {
        let [participant] = await Users.findBy({ email: participants[i] }); // participant is the whole object containing the entire row
        if (!participant) {
          res
            .status(400)
            .json({ message: "No user for participant " + participants[i] });
          return;
        }
        console.log(participant);
        ids.push(participant.id);
      }
      console.log("Done looking up participant...");

      // Now add event in its table
      const newEvent = {
        event_name: event.event_name,
        description: event.description,
        date: event.date,
        total_expenditure: event.total_expenditure,
        paid_by: event.paid_by
      };

      const eid = await eventDB.add(newEvent); //event created after all testings and verification
      console.log("Got id as ", eid);
      if (!eid || eid <= 0) {
        res.status(400).json({ message: "Failed to insert event..." });
        return;
      }

      const n = event.participants.length;
      //Create map table entry for each memeber in ids
      //Map entry - (eid, id, event.total_expenditure/n)
      //Use their id to create map table
      console.log("Total participants = ", n, " Ids = ", ids);

      for (let i = 0; i < ids.length; i++) {
        // loop through all the userids stored in the array who were participants in the event
        console.log("Adding user ", ids[i]);
        const mapEntry = await mapsDB.add({
          event_id: eid,
          user_id: ids[i],
          to_pay: event.total_expenditure / n
        });
        console.log("Here is the map Entry", mapEntry);
      }

      res.status(200).json({ message: "Event added" });
    } else {
      res.status(400).json({
        message:
          "you have missed the mandatory fields to be filled up;event_name,date,total_expenditure,paid_by are essential fields"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "we can't add the new record in event table",
      error: error
    });
  }
});

//1. Get my outgoing
router.post("/payout", async (req, res) => {});

//2. Get my incoming
router.post("/payin", async (req, res) => {});

module.exports = router;
