const express = require('express');
const Office = require('../Controller/office');

const router = express.Router();

router.post('/', Office.Create);
router.post('/update', Office.Update);
router.get('/one', Office.ReadOne);
router.get('/', Office.ReadAll);
router.delete('/', Office.Delete);

module.exports = router;