const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Protected routes
router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, addTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
