const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getAllUsers);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
