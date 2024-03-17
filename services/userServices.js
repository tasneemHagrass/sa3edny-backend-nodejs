const bcrypt = require('bcrypt');
const userModel = require('../models/User');
const { ObjectId } = require('mongoose').Types;

module.exports.FindAllUsers = async () => {
    try{
        const users = await userModel.find();
        return users;
    }catch (err){
        throw new Error('can not font any users');
    }
};

module.exports.addNewUser = async(userInfo) => {
  
    try{
      let hashedPassword = await bcrypt.hash(userInfo.password, 12);
        const user = new userModel({
            username: userInfo.username,
            password: hashedPassword,
            name: userInfo.name,
            age: userInfo.age,
            gender: userInfo.gender,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber
        });
        const createdUser = await user.save();
        return createdUser;
    }catch(err){
        throw new Error('Could not create user.');
    }  
};

module.exports.updateUserAccount = async (user) => {
    try {
      const status = await userModel.findByIdAndUpdate(user._id, user);
      return status;
    } catch (err) {
      throw new Error('Could not update user.');
    }
};

module.exports.findUserById = async (userID) => {
    try {
      const user = await userModel.findById(userID);
      return user;
    } catch (err) {
      throw new Error('Could not find product.');
    }
};

module.exports.chkUserCreds = async(username, password) => {
  try{
      // find user that has the same username
      const user = await userModel.findOne({
          username: username
      });
      // compare the plaintext password with the user's hashed password in the db.
      if(user != null){
        let isCorrectPassword = await bcrypt.compare(password, user.password);
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
      }else{
        return null;
      }

  }catch(error){
      throw new Error('Error logging in, please try again later.');
  }
};

module.exports.getUserInfo = async(user_id) => {
    try{
        // find user that has the same username and id
        const user = await userModel.findOne({
            _id: user_id
        });
            return user;
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.getUserByUsername = async(Username) => {
    try{
        // find user that has the same username and id
        const user = await userModel.findOne({
            username: Username
        });
            return user;
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};