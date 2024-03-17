const  db = require('firebase-admin');
const bcrypt = require('bcrypt');

class AdminModel {
  constructor(username, password, name, age, gender, email, phoneNumber) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.phoneNumber = phoneNumber;
    

  }

  async save() {
    try {
      const adminRef = await db.firestore().collection('Admin').add({
        username :this.username,
        password: this.password,
        name:this.name,
        age:this.age,
        gender:this.gender,
        email: this.email,
        phoneNumber:this.phoneNumber,
        
        
      });

      console.log(`admin created with ID: ${adminRef.id}`);
      return adminRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  async update(adminId, newData) {
    try {
      await db.firestore().collection('Admin').doc(adminId).update(newData);
      console.log(`Admin with ID ${adminId} updated`);
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }

  async delete(userId) {
    try {
      await db.firestore().collection('Admin').doc(userId).delete();
      console.log(`Admin with ID ${userId} deleted`);
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }

 async update2(email, newData) {
  try {
    //console.log('Email:', email);

    const adminSnapshot = await db.firestore().collection('Admin').where('email', '==', email).get();

      if (adminSnapshot.empty) {
        throw new Error('Admin not found');
      }
      const adminDoc = adminSnapshot.docs[0];
    const adminRef = db.firestore().collection('Admin').doc(adminDoc.id);

    await adminRef.update(newData);
    // const doc = await adminRef.get();
    // if (!doc.exists) {
    //   console.error(`Admin with email ${email} not found`);
    //   return; // or throw an error if you prefer
    // }

    // // Update the document with new values
    // await adminRef.update(newData);

    console.log(`Admin with ID ${email} updated`);
  } catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
}
async getAllusers(){
  try{
    const userCollection = await db.firestore().collection('Admin').get();
    const allUsers= userCollection.docs.map(doc => ({
      id:doc.id,
      ...doc.data()
    }));
    return allUsers;
  } catch(error){
    console.error('Error getting all admins:', error);
    throw error;
  }
}
async get(userId){
  try {
    const userSnapshot =await db.firestore().collection('Admin').doc(userId).get();
    if (!userSnapshot.exists) {
      throw new Error(`Admin with ID ${userId} not found`);
    }
    const user ={
      id: userSnapshot.id,
      ...userSnapshot.data(),
    }
    return user;
    // const User= userSnapshot.docs.map(doc => ({
    //   id:doc.id,
    //   ...doc.data()
    // }));
   // console.log(`Admin with ID ${userId}`);
    
  } catch (error) {
    console.error('Error getting admin:', error);
    throw error;
  }
}
async getAdminByEmail(email){
  try{
    const userSnapshot = await db.firestore().collection('Admin').where('email','==' , email).get();
    if (userSnapshot.empty){
      throw new Error(`admin with email ${email} not found`);
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
async isEmailExists(email) {
  try {
    const userSnapshot = await db.firestore().collection('Admin').where('email', '==', email).get();
    return !userSnapshot.empty;
  } catch (error) {
    console.error('Error checking if email exists:', error);
    throw error;
  }
}

async registerUser(email, password) {

  try {
    const emailExists = await this.isEmailExists(email);

    if (emailExists) {
      return { error: 'Email already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCredential = await db.auth().createUser({
      email,
      password: hashedPassword,
    });

    const userId = userCredential.uid;

    // Save user details to Firestore with the specified userId
    await db.firestore().collection('Admin').doc(userId).set({
      // ... other fields
      email,
      password: hashedPassword,
    });

    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // // Save the hashed password in your Firestore collection
    // const adminRef = await db.firestore().collection('Admin').add({
    //   // ... other fields
    //   email,
    //   password: hashedPassword,
    // });

    console.log('Successfully created new user:', userId);
    return { message: 'User registered successfully',userId };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
async logIN(email,password){
try{
  const userSnapshot = await db.firestore().collection('Admin').where('email','==',email).get();
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

async logIn(email, password) {
  try {
    const userData = await db.auth().getUserByEmail(email);
    
    console.log('Successfully signed in user:', userData.uid);
    
    // You can return the user record or any other information you need
    return { message: 'Successfully signed in user', userData };
  } catch (error) {
    console.error('Error signing in user:', error.message);
    throw error;
  }
}
async resetPassword(email, username, password){
  try{
  const admin = await this.getAdminByEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);

 // console.log(userData);
  if(admin.username === username){
    const adminId = admin.id;
    delete admin.id;
    //console.log(user);
    await this.update(adminId, admin);
    return { message: 'Password reset successfully' };
  }else{ return "admin doesn't match"}
 
  // Perform the update operation
  //await this.update(user.uid, { password: hashedPassword }); // Update only the password field
} catch(error){
  console.error('error in forget password: ', error);
  throw error;
}
}
}

module.exports = AdminModel;
