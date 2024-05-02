const express = require('express');
const Member = require('../Controller/member');

const router = express.Router();

router.post('/', Member.Create);
router.post('/update', Member.Update);
router.get('/one', Member.ReadOne);
router.get('/', Member.ReadAll);
router.delete('/', Member.Delete);

module.exports = router;