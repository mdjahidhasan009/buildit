const express = require('express');

const designController = require('../controllers/designController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, designController.createDesign);
router.get('/user-design/:design_id', auth, designController.getUserDesign);
router.put('/update-design/:design_id', auth, designController.updateDesign);

export default router;