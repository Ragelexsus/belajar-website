import express from "express";
import usercontroller from "../controller/users.js"

const router = express.Router();

router.get('/', usercontroller.getalluser);
router.post('/', usercontroller.CreateUser);

export default router;
