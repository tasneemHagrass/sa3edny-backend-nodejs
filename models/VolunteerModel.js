const db =require('firebase-admin');
//put constructor to varaible (parameter)
class VolunteerModel{
  constructor(name, phone, addresss, age, national_id, seen){
    this.name = name;
    this.phone = phone;
    this.addresss = addresss;
    this.seen = seen;
    this.national_id = national_id;
    this.age = age ;
    
    
  }
  async save(){
    try{
      const volunteerRef = await db.firestore().collection('volunteer_user').add({
        volunteername: this.name, 
        phone:this.phone, 
        addresss:this.addresss, 
        age:this.age,
        national_id:this.national_id,
        seen:this.seen,
      });
      console.log(`volunteer user created with ${volunteerRef.id}`);
      return volunteerRef.id 
    } catch (error){
      console.error('error creating user',error);
      throw error;
    }
  }
}
module.exports=VolunteerModel;