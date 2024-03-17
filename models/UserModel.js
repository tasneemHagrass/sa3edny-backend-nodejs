const  db = require('firebase-admin');
const bcrypt = require('bcrypt');

class UserModel {
    constructor(username, password ,name, age, gender, email, phoneNumber) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.phoneNumber = phoneNumber;}
    
    async save() {
        try {
          const userRef = await db.firestore().collection('User').add({
            username: this.username,
            password: this.password,
            name: this.name,
            age: this.age,
            gender: this.gender,
            phoneNumber: this.phoneNumber,
            email: this.email,
            });
      
          console.log(`User created with ID: ${userRef.id}`);
          return userRef.id;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
    }
    async update(userId, newData) {
        try {
          console.log( newData);
          const updatedUser = await db.firestore().collection('User').doc(userId).update(newData);
          console.log(`user with ID ${userId} updated`);
          return updatedUser;
        } catch (error) {
          console.error('Error updating admin:', error);
          throw error;
        }
      }
    async update2(email, newData) {
        try {
          //console.log('Email:', email);
      
          const userSnapshot = await db.firestore().collection('User').where('email', '==', email).get();
      
            if (userSnapshot.empty) {
              throw new Error('User not found');
            }
            const userDoc = userSnapshot.docs[0];
          const userRef = db.firestore().collection('User').doc(userDoc.id);
      
          await userRef.update(newData);
          // const doc = await adminRef.get();
          // if (!doc.exists) {
          //   console.error(`Admin with email ${email} not found`);
          //   return; // or throw an error if you prefer
          // }
      
          // // Update the document with new values
          // await adminRef.update(newData);
      
          console.log(`User with ID ${email} updated`);
        } catch (error) {
          console.error('Error updating User:', error);
          throw error;
        }
      }
    async updateByEmail(email, newData) {
      try {

        await db.firestore().collection('User').doc(email).update(newData);
        //console.log('Email:', email);
    
        // const userSnapshot = await db.firestore().collection('User').where('email', '==', email).get();
    
        //   if (userSnapshot.empty) {
        //     throw new Error('User not found');
        //   }
        //   const userDoc = userSnapshot.docs[0];
        // const userRef = db.firestore().collection('User').doc(userDoc.id);
    
        // await userRef.update(newData);
        // const doc = await adminRef.get();
        // if (!doc.exists) {
        //   console.error(`Admin with email ${email} not found`);
        //   return; // or throw an error if you prefer
        // }
    
        // // Update the document with new values
        // await adminRef.update(newData);
    
        console.log(`User with ID ${email} updated`);
      } catch (error) {
        console.error('Error updating User:', error);
        throw error;
      }
    }
    async getAllusers(){
      try{
        const userCollection = await db.firestore().collection('User').get();
        const allUsers= userCollection.docs.map(doc => ({
          id:doc.id,
          ...doc.data()
        }));
        return allUsers;
      } catch(error){
        console.error('Error getting all users:', error);
        throw error;
      }
    }
    async delete(userId) {
      try {
        await db.firestore().collection('User').doc(userId).delete();
        console.log(`User with ID ${userId} deleted`);
      } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
    }
    async isEmailExists(email) {
      try {
        const userSnapshot = await db.firestore().collection('User').where('email', '==', email).get();
        return !userSnapshot.empty;
      } catch (error) {
        console.error('Error checking if email exists:', error);
        throw error;
      }
    }
    async formatPhoneNumber(phoneNumber) {
      // Remove spaces and dashes
      const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/-/g, '');
    
      // Add the plus sign and country code if it's missing
      const formattedPhoneNumber = cleanedPhoneNumber.startsWith('+')
        ? cleanedPhoneNumber
        : `+20${cleanedPhoneNumber}`;
    
      //console.log('Input phone number:', phoneNumber);
      //console.log('Cleaned phone number:', cleanedPhoneNumber);
      //console.log('Formatted phone number:', formattedPhoneNumber);
    
      return formattedPhoneNumber;
    }
    async registerUser(username, password, name, age, gender, email, phoneNumber) {
      try {
        // Validate and format the phone number
        const formattedPhoneNumber = await this.formatPhoneNumber(phoneNumber);
    
        console.log('Formatted phone number for registration:', formattedPhoneNumber);
    
        const emailExists = await this.isEmailExists(email);
    
        if (emailExists) {
          return { error: 'Email already exists' };
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCredential = await db.auth().createUser({
          username,
          password: hashedPassword,
          name,
          age,
          gender,
          email,
          phoneNumber: formattedPhoneNumber,
        });
    
        const userId = userCredential.uid;
    
        // Save user details to Firestore with the specified userId
        await db.firestore().collection('User').doc(userId).set({
          username,
          password: hashedPassword,
          name,
          age,
          gender,
          email,
          phoneNumber: formattedPhoneNumber,
        });
    
        console.log('Successfully created new user:', userId);
        return { message: 'User registered successfully', userId };
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    }
    async logIN(email,password){
      try{
        const userSnapshot = await db.firestore().collection('User').where('email','==',email).get();
        if (userSnapshot.empty){
          throw new Error ('user not found'); 
        } 
        const userData = userSnapshot.docs[0].data();
        const isPasswordVaild = await bcrypt.compare(password,userData.password);
        if (!isPasswordVaild){
          throw new Error ('Invalid password');
        }
        console.log('successfully signed in user:', userSnapshot.docs[0].id);
        return userSnapshot.docs[0].id;
      }catch (error) {
        console.error('Error signing in user:', error);
        throw error;
      }
    }


    async getUserByID(id){
      try{
        const userSnapshot = await db.firestore().collection('User').doc(id).get();
        if (userSnapshot.empty){
          throw new Error(`User ${id} not found`);
        }
        const user ={
          id:userSnapshot.docs[0].id,
          ...userSnapshot.docs[0].data(),
        };
        return user;
      } catch(error){
        console.error('error getting user by id ', error);
        throw error;
      }
    }
    async getUserByEmail(email){
      try{
        const userSnapshot = await db.firestore().collection('User').where('email','==' , email).get();
        if (userSnapshot.empty){
          throw new Error(`User with email ${email} not found`);
        }
        const user ={
          id:userSnapshot.docs[0].id,
          ...userSnapshot.docs[0].data(),
        };
        return user;
      } catch(error){
        console.error('error getting admin by email', error);
        throw error;
      }
    }
    async resetPassword(email, username, password){
      try{
      const user = await this.getUserByEmail(email);
      const hashedPassword = await bcrypt.hash(password, 10);
    
     // console.log(userData);
      if(user.username === username){
        const userid = user.id;
        delete user.id;
        user.password = hashedPassword;
        //console.log(user);
        const updatedUser = await this.update(userid, user);
        return updatedUser;
      }else{ return "user doesn't match"}
     
      // Perform the update operation
      //await this.update(user.uid, { password: hashedPassword }); // Update only the password field
    } catch(error){
      console.error('error in forget password: ', error);
      throw error;
    }
    }
}
module.exports = UserModel;