const {Router} = require('express');

const missingController = require('../controllers/missingController');
const missingRouter= Router();
missingRouter.post('/createCase',missingController.post);
missingRouter.put('/updateCase/:id',missingController.put);
missingRouter.delete('/deletecase/:id',missingController.delete);
missingRouter.get('/getAllCases',missingController.getAllCases);
missingRouter.get('/getCaseById/:id',missingController.getCaseById);

module.exports =missingRouter;