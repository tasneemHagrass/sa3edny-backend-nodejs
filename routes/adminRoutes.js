// import Express Router from express
const {Router} = require('express');

// import our Controllers
const adminsController = require('../controllers/adminController');

const AdminRouter = Router();

//AdminRouter.put('/updateAdmin', adminsController.updateAdminAccount);
//AdminRouter.put('/forgetPassword', adminsController.forgetPassword);
//AdminRouter.post('/register', adminsController.adminRegistration);
//AdminRouter.get('/getAllAdmins', adminsController.getAllAdmins);
//AdminRouter.get('/getAdminById/:adminID', adminsController.findadminById);
AdminRouter.post('/createAdmin', adminsController.post);
AdminRouter.get('/getAlluser', adminsController.getAllUsers);
AdminRouter.put('/updateAdmin/:id',adminsController.put);
AdminRouter.delete('/deleteUser/:id',adminsController.delete);
AdminRouter.put('/updateUser/:email',adminsController.put2);
AdminRouter.get('/getUserById/:id',adminsController.getUseById);
AdminRouter.get('/getAdminByEmail',adminsController.getAdminByEmail);
AdminRouter.post('/registerUser',adminsController.registerUser);
AdminRouter.get('/userLogin',adminsController.logIn);
AdminRouter.post('/userLogin2',adminsController.logIn2);
AdminRouter.put('/resetAdminPassword',adminsController.resetAdminPassword);





// export the router instance we created.
module.exports = AdminRouter;

