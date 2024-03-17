// import Express Router from express
const {Router} = require('express');

// import our Controllers
const missingChildController = require('../controllers/missingChildController');

const missingChildtRouter = Router();

//AdminRouter.put('/updateAdmin', adminsController.updateAdminAccount);
//AdminRouter.put('/forgetPassword', adminsController.forgetPassword);
//AdminRouter.post('/register', adminsController.adminRegistration);
//AdminRouter.get('/getAllAdmins', adminsController.getAllAdmins);
//AdminRouter.get('/getAdminById/:adminID', adminsController.findadminById);
missingChildtRouter.post('/createMissingCase', missingChildController.post);

// export the router instance we created.
module.exports = missingChildtRouter;
