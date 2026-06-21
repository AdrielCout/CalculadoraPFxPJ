import pool from '../src/config/database.js';

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS comparisons (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    renda_mensal DECIMAL(10,2),
    custos_mensais DECIMAL(10,2),
    resultado_json JSON,
    created_at TIMESTAMP DEFAULT NOW()
  );
`);

console.log('✓ Tabelas criadas');
await pool.end();
