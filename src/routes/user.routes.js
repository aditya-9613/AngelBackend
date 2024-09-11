import { Router } from "express";
import { UserLogin, userRegister } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()


router.route('/register').post(userRegister)
router.route('/login').post(UserLogin)

//secured Routes

export default router