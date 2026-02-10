const pool = require("../config/db");

// GET transactions
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id=$1 ORDER BY date DESC",
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD transaction
const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, type, category, description, date } = req.body;

    if (!amount || !type || !date) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await pool.query(
      `INSERT INTO transactions
            (user_id, amount, type, category, description, date)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
      [userId, amount, type, category, description, date],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE transaction
const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM transactions WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
