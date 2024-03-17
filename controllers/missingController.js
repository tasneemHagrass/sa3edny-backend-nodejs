const missingModel= require('../models/missingModel');
module.exports.post = async (req, res) => {
    try {
      const data=[req.body.child_name,
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
        req.body.userId,
        req.body.phoneNumber,
        req.body.reporterGovernmemt,
        req.body.reporterCity,
        req.body.reporterAddresss,
        req.body.reporterRelation,
        req.body.reporterNational_id];

        console.log(data);
      
  
      const newCase = new missingModel(...data);
  
      newCase.save()
    .then(CaseId => {
      
      return res.send(`case created with ID: ${CaseId}`);
    })
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
  };
  module.exports.put = async (req, res) => {
    try {
     const caseId = req.params.id;
     console.log(caseId );
     const newData = req.body; 
     const MissingModel = new missingModel();
     await MissingModel.update(caseId, newData);
    
    
     return res.json({ message: `case with ID ${caseId} updated` });
    } catch (error) {
      console.error('Error updating case:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports.delete = async (req, res) => {
    try {
     const caseId = req.params.id;
     const MissingModel = new missingModel();
     await MissingModel.delete(caseId);
  
    
     return res.json({ message: `case with ID ${caseId} deleted` });
    } catch (error) {
      console.error('Error updating case:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports.getAllCases = async(req, res) => {
    try{
      const MissingModel= new missingModel();
      const allCases= await MissingModel.getAllCases();
      
      return res.json({ cases: allCases});
    }catch (error) {
      console.error('Error getting all cases:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports.getCaseById = async (req, res) => {
    try {
     const caseId = req.params.id;
     const MissingModel = new missingModel();
     // take instasne of the class for hte api not the class itself 
     Case= await MissingModel.get(caseId);
     return res.json({ Case: Case});
    } catch (error) {
      console.error('Error getting case:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };