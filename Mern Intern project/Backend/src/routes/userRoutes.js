const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
// CRUD Routes

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/profile", verifyToken, userController.getProfile);

module.exports = router;
