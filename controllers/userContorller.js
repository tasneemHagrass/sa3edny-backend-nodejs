const UserModel = require('../models/UserModel');

module.exports.post = async (req, res) => {
    try {
      //const newUser = new AdminModel('john_doe', 'password123', 'John Doe', '25', 'Male', 'john@example.com', '1234567890');
  
      const data=[req.body.username,req.body.password, req.body.name,req.body.age,
        req.body.gender,req.body.email,req.body.phoneNumber];
  
      const newUser = new UserModel(...data);
  
      newUser.save()
    .then(UserId => {
      
      return res.send(`user created with ID: ${UserId}`);
    })
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
  };
module.exports.put = async (req, res) => {
    try {
     const userId = req.params.id;
     const newData = req.body; 
     const userModel = new UserModel();
     await userModel.update(userId, newData);
  
    
     return res.json({ message: `user with ID ${userId} updated` });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports.updateUserWithEmail = async (req, res) => {
    try {
     // const {email ,newData} = req.body;
    
     const email = req.params.email; 
     const newData = req.body; 
     const userModel = new UserModel();
    //  if (!email || !newData) {
    //   return res.status(400).json({ error: 'Email and newData are required' });
    // }
     await userModel.update(email, newData);
  
    
     return res.json({ message: `User with email ${email} updated` });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports.updateByEmail = async (req, res) => {
    try {
      const {email ,newData} = req.body;
      if (!email || !newData) {
        return res.status(400).json({ error: 'Email and newData are required' });
      }
    //  const email = req.params.email; 
    //  const newData = req.body; 
     const userModel = new UserModel();
    //  if (!email || !newData) {
    //   return res.status(400).json({ error: 'Email and newData are required' });
    // }
     await userModel.update(email, newData);
  
    
     return res.json({ message: `User with email ${email} updated` });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports.getAllUsers = async(req, res) => {
    try{
      const userModel= new UserModel();
      const allUsers= await   userModel.getAllusers();
      
      return res.json({ users: allUsers });
    }catch (error) {
      console.error('Error getting all users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports.delete = async (req, res) => {
    try {
     const userId = req.params.id;
     const userModel = new UserModel();
     await userModel.delete(userId);
  
    
     return res.json({ message: `User with ID ${userId} deleted` });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports.registerUser= async(req, res)=>{
    try{
      const { username,
        password,
        name,
        age,
        gender,
        email, 
        phoneNumber} = req.body;
      // Validate if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const userModel= new UserModel();
      // Check if the email already exists
      const emailExistsResult =await userModel.isEmailExists(email);
      // if the prevoius function is true return Email already exists
      if (emailExistsResult) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      //user registeration 
      const registrationResult = await userModel.registerUser(username, password, name, age, gender, email, phoneNumber);

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
      const userModel= new UserModel();
    
      //user login 
      const loginResult = await userModel.logIN(email, password);
      if (loginResult.error) {
        return res.status(422).json({ error: loginResult.error });
      }
      return res.status(200).json({ message: 'successful login', userId: loginResult });
    }catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports.getUserByEmail= async(req, res)=>{
    try{
      const {email} = req.body;
      const userModel= new UserModel();
      const user = await userModel.getUserByEmail(email);
      return res.json({user})
    }catch (error){
      console.error('error getting user  by email:', error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  };
 module.exports.resetUserPassword= async(req,res)=>{
  try{
    const {email,username, password}=req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    const userModel= new UserModel();
    const user = await userModel. resetPassword(email, username, password);
    return res.json({user});
  }catch (error){
      console.error('error getting user  by email:', error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
 };
  