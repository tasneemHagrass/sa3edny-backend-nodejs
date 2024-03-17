const db = require('firebase-admin');

class missingChildModel {
  constructor(child_name, gender, child_health_state, age, date_of_missing, cloths_description_special_marks, classification_loss, lost_before, child_government, child_city, child_address, has_official_report, reporter_name, phoneNumber, reporterGovernmemt, reporterCity, reporterAddresss, reporterRelation, reporterNational_id) {
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
    this.phoneNumber = phoneNumber;
    this.reporterGovernmemt = reporterGovernmemt;
    this.reporterCity = reporterCity;
    this.reporterAddresss = reporterAddresss;
    this.reporterRelation = reporterRelation;
    this.reporterNational_id = reporterNational_id;
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
        phoneNumber: this.phoneNumber,
        reporterGovernmemt: this.reporterGovernmemt,
        reporterCity: this.reporterCity,
        reporterAddresss: this.reporterAddresss,
        reporterRelation: this.reporterRelation,
        reporterNational_id: this.reporterNational_id,
      });
      console.log(`Parent user created with ID: ${missingCaseRef.id}`);
      return missingCaseRef.id;
    } catch (error) {
      console.error('Error creating user', error);
      throw error;
    }
  }
}

module.exports = missingChildModel;
