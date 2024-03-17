//const adminService = require('../services/adminServices');
//const bcrypt = require('bcrypt');
const AdminModel = require('../models/AdminModel');


module.exports.post = async (req, res) => {
  try {
    //const newUser = new AdminModel('john_doe', 'password123', 'John Doe', '25', 'Male', 'john@example.com', '1234567890');

    const data=[req.body.username,req.body.password, req.body.name,req.body.age,
      req.body.gender,req.body.email,req.body.phoneNumber];
    

    const newUser = new AdminModel(...data);

    newUser.save()
  .then(UserId => {
    
    return res.send(`admin created with ID: ${UserId}`);
  })
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};
// module.exports.get = async (req, res) => {

//     const email = req.body.email;

//     // if (!email) {
//     //   return res.status(400).json({ error: 'Missing email parameter' });
//     // }
  
//     try {
//       // Assume you have a "users" collection in Firestore
//       const adminRef = admin.firestore().collection('Admin').doc(email);
//       const snapshot = await adminRef.get();
  
//       if (!snapshot.exists) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       const userData = snapshot.data();
//       res.json({ Admin: userData });
//     } catch (error) {
//       console.error('Error searching for user:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  
module.exports.put = async (req, res) => {
  try {
   const adminId = req.params.id;
   const newData = req.body; 
   const adminModel = new AdminModel();
   await adminModel.update(adminId, newData);

  
   return res.json({ message: `Admin with ID ${adminId} updated` });
  } catch (error) {
    console.error('Error updating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.delete = async (req, res) => {
  try {
   const userId = req.params.id;
   const adminModel = new AdminModel();
   await adminModel.delete(userId);

  
   return res.json({ message: `Admin with ID ${userId} deleted` });
  } catch (error) {
    console.error('Error updating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.put2 = async (req, res) => {
  try {
   const {email,newData} = req.body; 
   const adminModel = new AdminModel();
  //  if (!email || !newData) {
  //   return res.status(400).json({ error: 'Email and newData are required' });
  // }
   await adminModel.update2(email, newData);

  
   return res.json({ message: `Admin with ID ${email} updated` });
  } catch (error) {
    console.error('Error updating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.getAllUsers = async(req, res) => {
  try{
    const adminModel= new AdminModel();
    const allUsers= await adminModel.getAllusers();
    
    return res.json({ users: allUsers });
  }catch (error) {
    console.error('Error getting all users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.getUseById = async (req, res) => {
  try {
   const userId = req.params.id;
   const adminModel = new AdminModel();
   // take instasne of the class for hte api not the class itself 
   user= await adminModel.get(userId);
   return res.json({ User: user});
  } catch (error) {
    console.error('Error updating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.getAdminByEmail= async(req, res)=>{
  try{
    const {email} = req.body;
    const adminModel= new AdminModel();
    const admin = await adminModel.getAdminByEmail(email);
    return res.json({admin})
  }catch (error){
    console.error('error getting admin  by email:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
module.exports.registerUser= async(req, res)=>{
  try{
    const { email, password} = req.body;
    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const adminModel= new AdminModel();
    // Check if the email already exists
    const emailExistsResult =await adminModel.isEmailExists(email);
    // if the prevoius function is true return Email already exists
    if (emailExistsResult) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    //user registeration 
    const registrationResult = await adminModel.registerUser(email,password);
    if (registrationResult.error) {
      return res.status(422).json({ error: registrationResult.error });
    }
    return res.status(201).json({ message: registrationResult.message, userId: registrationResult.userId });
  }catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.logIn= async(req, res)=>{
  try{
    const { email, password} = req.body;
    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    // if (!email) {
    //   return res.status(400).json({ error: 'Email are required' });
    // }
    // if (!password) {
    //   return res.status(400).json({ error: ' password are required' });
    // }
    const adminModel= new AdminModel();
  
    //user login 
    const loginResult = await adminModel.logIN(email, password);
    if (loginResult.error) {
      return res.status(422).json({ error: loginResult.error });
    }
    return res.status(200).json({ message: 'successful login', userId: loginResult });
  }catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.logIn2 = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const adminModel = new AdminModel();

    // User login
    const loginResult = await adminModel.logIn(email, password);
    if (loginResult.error) {
      return res.status(422).json({ error: loginResult.error });
    }

    return res.status(200).json({ message: 'Successful login', userId: loginResult });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.resetAdminPassword= async(req,res)=>{
  try{
    const {email,username, password}=req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    const adminModel= new AdminModel();
    const admin = await adminModel. resetPassword(email, username, password);
    return res.json({admin});
  }catch (error){
      console.error('error getting user  by email:', error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
 };
  