// backend/test-db-connection.js
import db from './config/db.js';

async function testConnection() {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    console.log("✅ PostgreSQL Connected Successfully:", result.rows[0]);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  } finally {
    await db.destroy(); // Close connection pool
  }
}

testConnection();
