import express from "express";
import User from "../models/user.models.js";
import { DeleteUser, UpdateUser, getAllusers, getUser, register } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/all", getAllusers);
router.post("/new", register);

// router.get("/userid/:id", getUser);
// router.put("/userid/:id", UpdateUser);
// router.delete("/userid/:id", DeleteUser);

//if main route is same then we can also do like this
router.route('/userid/:id').get(getUser).put(UpdateUser).delete(DeleteUser);



export default router;
