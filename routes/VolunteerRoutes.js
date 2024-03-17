// import Express Router from express
const {Router} = require('express');

// import our Controllers
const VolunteerController = require('../controllers/VolunteerController');

const volunteerRouter = Router();

//AdminRouter.put('/updateAdmin', adminsController.updateAdminAccount);
//AdminRouter.put('/forgetPassword', adminsController.forgetPassword);
//AdminRouter.post('/register', adminsController.adminRegistration);
//AdminRouter.get('/getAllAdmins', adminsController.getAllAdmins);
//AdminRouter.get('/getAdminById/:adminID', adminsController.findadminById);
volunteerRouter.get('/test', VolunteerController.test);

// export the router instance we created.
module.exports = volunteerRouter;
