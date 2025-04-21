require('dotenv').config();
const sql = require('mssql');
// Database configuration
const dbConfig = {
  user: 'sa',
  password: 'pubglite123',
  server: 'DESKTOP-H6KJ4AR\\SQLEXPRESS14',
  database: 'Voting_Management',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    
  }
};
console.log("DB Config:", dbConfig);
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed!', err));
module.exports = { sql, poolPromise };
