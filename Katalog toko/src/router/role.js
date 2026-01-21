import express from 'express';
import routers from '../controller/role.js'


const router = express.Router();

router.get('/',routers.get_role)

router.post('/',routers.create_role)

export default router;