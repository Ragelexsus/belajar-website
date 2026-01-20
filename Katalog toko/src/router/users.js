import express from "express";
import usercontroller from "../controller/users.js"

const router = express.Router();

router.get('/', usercontroller.getalluser);

export default router;
