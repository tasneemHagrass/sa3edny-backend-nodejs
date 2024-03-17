const VolunteerModel = require('../models/VolunteerModel');
module.exports.test= async(req,res) => {
  try{
    const newVolunteer = new VolunteerModel('ahmed hagrss','1234567890','22a','bgftfuu','2115186526963900','29');
    newVolunteer.save()
    .then(volunteerId => {
      return res.send(`user created with ID :${volunteerId}`);
    })
    
  } catch (err) {
      return res.status(500).send({
        error: err.message
      });
  }
};