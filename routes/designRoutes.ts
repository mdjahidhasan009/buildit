const express = require('express');
const designController = require('../controllers/designController');

const router = express.Router();

router.post('/create', designController.createDesign);

export default router;