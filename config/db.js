const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection when app starts
pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL Connected");
        client.release();
    })
    .catch(err => {
        console.error("❌ DB Connection Error:", err.message);
    });

module.exports = pool;
