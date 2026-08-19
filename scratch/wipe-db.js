/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require('pg');

async function cleanDB() {
  const connectionString = "postgres://postgres:postgres@localhost:51215/nine_portfolio?sslmode=disable";
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    
    // Drop the public schema and recreate it
    await client.query("DROP SCHEMA public CASCADE;");
    await client.query("CREATE SCHEMA public;");
    
    // Also drop prisma migrations table just in case it wasn't in public
    console.log("Schema public dropped and recreated successfully.");
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}

cleanDB();
