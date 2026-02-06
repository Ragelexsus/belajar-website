import express from "express";
import usercontroller from "../controller/users.js"
import authtoken from "../middleware/users.js"

const router = express.Router();

router.get('/', authtoken.authenticationtoken,usercontroller.getalluser);
router.get('/login', usercontroller.login);

router.post('/register', usercontroller.CreateUser);



export default router;
