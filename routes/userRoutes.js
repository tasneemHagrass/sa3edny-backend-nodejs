const {Router} = require('express');

// import our Controllers
const userController = require('../controllers/userContorller');

const UserRouter = Router();

UserRouter.post('/createUser',userController.post);
UserRouter.put('/updateUser/:id',userController.put);
UserRouter.put('/updateUserWithEmail/:email', userController.updateUserWithEmail);
UserRouter.put('/updateByEmail', userController.updateByEmail);
UserRouter.get('/getAlluser', userController.getAllUsers);
UserRouter.delete('/deleteUser/:id',userController.delete);
UserRouter.post('/registerUser', userController.registerUser);
UserRouter.get('/userLogin', userController.logIn);
UserRouter.get('/getUserByEmail',userController.getUserByEmail);
UserRouter.put('/resetUserPassword',userController.resetUserPassword);
module.exports= UserRouter;