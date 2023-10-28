const { addmsg, getmsgs } = require('../controller/messageController');

const router = require('express').Router();

router.post("/addmsg",addmsg);
router.post("/getmsgs",getmsgs);



module.exports = router;