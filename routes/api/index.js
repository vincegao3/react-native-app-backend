const epxress = require("express");
const router = epxress.Router();

const auth = require('./auth');
const consultRecord = require('./consultation-record');

router.use('/auth', auth);
router.use('/consult-record', consultRecord);

module.exports = router;
