const missingChildModel = require('../models/missingChildModel');
// module.exports.test= async(req,res) => {
//   try{
//     const newParent = new ParentModel('ahmed hagrss','1234567890','22a','fatherrr','2115186526963900','mvsiisfjew');
//     newParent.save()
//     .then(parentId => {
//       return res.send(`user created with ID :${parentId}`);
//     })
    
//   } catch (err) {
//       return res.status(500).send({
//         error: err.message
//       });
//   }
// };

module.exports.post = async (req, res) => {
  try {
    const data = [
      req.body.child_name,
      req.body.gender,
      req.body.child_health_state,
      req.body.age,
      req.body.date_of_missing,
      req.body.cloths_description_special_marks,
      req.body.classification_loss,
      req.body.lost_before,
      req.body.child_government,
      req.body.child_city,
      req.body.child_address,
      req.body.has_official_report,
      req.body.reporter_name,
      req.body.phoneNumber,
      req.body.reporterGovernmemt,
      req.body.reporterCity,
      req.body.reporterRelation,
      req.body.reporterNational_id // Ensure the field name matches the model
    ];

    console.log(data);

    const newCase = new missingChildModel(...data);
    newCase.save()
       .then(caseId => {
        return res.send(`admin created with ID: ${caseId}`);
       })
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};
