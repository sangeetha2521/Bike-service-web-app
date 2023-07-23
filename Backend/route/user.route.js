const express = require("express");

const userController = require("../controller/user.controller");
const { authorization } = require("../service/auth.service");
const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.signIn);
router.post("/logout", authorization, userController.logout);
router.get("/currentUser", authorization, userController.currentUser);

module.exports = router;
