require('dotenv').config();
const express = require('express');
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    instanceName: process.env.DB_INSTANCE,
    encrypt: false,
    trustServerCertificate: true
  }
};

const app = express();

app.get('/teste', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const r = await pool.request().query('SELECT DB_NAME() AS banco, GETDATE() AS agora');
    res.json(r.recordset);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
