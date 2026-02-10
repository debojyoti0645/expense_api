const pool = require("../config/db");

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total Income
    const income = await pool.query(
      "SELECT COALESCE(SUM(amount),0) FROM transactions WHERE user_id=$1 AND type='income'",
      [userId],
    );

    // Total Expense
    const expense = await pool.query(
      "SELECT COALESCE(SUM(amount),0) FROM transactions WHERE user_id=$1 AND type='expense'",
      [userId],
    );

    const totalIncome = parseFloat(income.rows[0].coalesce);
    const totalExpense = parseFloat(expense.rows[0].coalesce);

    // Category aggregation
    const category = await pool.query(
      `SELECT category, SUM(amount) as total
             FROM transactions
             WHERE user_id=$1 AND type='expense'
             GROUP BY category`,
      [userId],
    );

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryBreakdown: category.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getSummary };
