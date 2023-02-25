var express = require('express');
var claimController = require('../controllers/claimController');
var router = express.Router();

router.post('/', claimController.insert_claim);
router.put('/', claimController.update_claim);
router.delete('/', claimController.delete_claim);

module.exports = router;