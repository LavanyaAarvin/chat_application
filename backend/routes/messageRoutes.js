const express = require("express");
const {
  allAllMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:chatId", protect, allAllMessages);
router.post("/", protect, sendMessage);

module.exports = router;
