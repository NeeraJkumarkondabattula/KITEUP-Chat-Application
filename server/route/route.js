const { register, login,setAvatar, allUsers } = require('../controller/userController');

const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setavatar/:id",setAvatar);
router.get("/allusers/:id",allUsers);


module.exports = router;