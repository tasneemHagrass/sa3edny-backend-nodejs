const  db = require('firebase-admin');

class missingChildModel {
    constructor(child_name, gender, child_health_state, age, date_of_missing, cloths_description_special_marks, classification_loss, lost_before, child_government, child_city, child_address, has_official_report, reporter_name,userId, phoneNumber, reporterGovernmemt, reporterCity, reporterAddresss, reporterRelation, reporterNational_id) {
      this.child_name = child_name;
      this.gender = gender;
      this.child_health_state = child_health_state;
      this.age = age;
      this.date_of_missing = date_of_missing;
      this.cloths_description_special_marks = cloths_description_special_marks;
      this.classification_loss = classification_loss;
      this.lost_before = lost_before;
      this.child_government = child_government;
      this.child_city = child_city;
      this.child_address = child_address;
      this.has_official_report = has_official_report;
      this.reporter_name = reporter_name;
      this.userId=userId;
      this.phoneNumber = phoneNumber;
      this.reporterGovernmemt = reporterGovernmemt;
      this.reporterCity = reporterCity;
      this.reporterAddresss = reporterAddresss;
      this.reporterRelation = reporterRelation;
      this.reporterNational_id = reporterNational_id;
      console.log(reporterNational_id);
    }
    async save() {
        try {
          const missingCaseRef = await db.firestore().collection('missing_child').add({
            child_name: this.child_name,
            gender: this.gender,
            child_health_state: this.child_health_state,
            age: this.age,
            date_of_missing: this.date_of_missing,
            cloths_description_special_marks: this.cloths_description_special_marks,
            classification_loss: this.classification_loss,
            lost_before: this.lost_before,
            child_government: this.child_government,
            child_city: this.child_city,
            child_address: this.child_address,
            has_official_report: this.has_official_report,
            reporter_name: this.reporter_name,
            userId:this.userId,
            phoneNumber: this.phoneNumber,
            reporterGovernmemt: this.reporterGovernmemt,
            reporterCity: this.reporterCity,
            reporterAddresss: this.reporterAddresss,
            reporterRelation: this.reporterRelation,
            reporterNational_id: this.reporterNational_id,  
                
            
          });
    
          console.log(`admin created with ID: ${missingCaseRef.id}`);
          return missingCaseRef.id;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      }
    async update(caseId, newData) {
        try {
          await db.firestore().collection('missing_child').doc(caseId).update(newData);
          console.log(`case with ID ${caseId} updated`);
        } catch (error) {
          console.error('Error updating case:', error);
          throw error;
        }
      }
    async delete(caseId) {
        try {
          await db.firestore().collection('missing_child').doc(caseId).delete();
          console.log(`case with ID ${caseId} deleted`);
        } catch (error) {
          console.error('Error deleting case:', error);
          throw error;
        }
      }
      async getAllCases(){
        try{
          const caseCollection = await db.firestore().collection('missing_child').get();
          const allCases= caseCollection.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
          }));
          return allCases;
        } catch(error){
          console.error('Error getting all cases:', error);
          throw error;
        }
      }
      async get(caseId){
        try {
          const caseSnapshot =await db.firestore().collection('missing_child').doc(caseId).get();
          if (!caseSnapshot.exists) {
            throw new Error(`case with ID ${caseId} not found`);
          }
          const Case ={
            id: caseSnapshot.id,
            ...caseSnapshot.data(),
          }
          return Case;
          
        } catch (error) {
          console.error('Error getting case:', error);
          throw error;
        }
      }
}
module.exports = missingChildModel;