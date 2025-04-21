// const { sql, poolPromise } = require('../config/db');

// const Task = {
//   async getAllTasks() {
//     const pool = await poolPromise;
//     const result = await pool.request().query('SELECT * FROM Tasks');
//     return result.recordset;
//   },

//   async getTaskById(id) {
//     const pool = await poolPromise;
//     const result = await pool.request().input('id', sql.Int, id)
//       .query('SELECT * FROM Tasks WHERE id = @id');
//     return result.recordset[0];
//   },

//   //const result = await pool.request().query(`SELECT * FROM Tasks WHERE id = ${id}`);

// //   async createTask(title, description) {
// //     const pool = await poolPromise;
// //     await pool.request()
// //       .input('title', sql.VarChar, title)
// //       .input('description', sql.VarChar, description)
// //       .query('INSERT INTO Tasks (title, description) VALUES (@title, @description)');
// //   },
//   async createTask(title, description) {
//     try{
//     const pool = await poolPromise;
//     await pool.request()
//       .input('title', sql.VarChar, title)
//       .input('description', sql.Text, description)
//       .execute('CreateTask');  // Calls the stored procedure
//     }
//     catch{
//       console.error("Error executing stored procedure:", error);
//       throw error; 
//     }
// },

//   async updateTask(id, title, description) {
//     const pool = await poolPromise;
//     await pool.request()
//       .input('id', sql.Int, id)
//       .input('title', sql.VarChar, title)
//       .input('description', sql.Text, description)
//       .query('UPDATE Tasks SET title = @title, description = @description WHERE id = @id');
//   },

//   async deleteTask(id) {
//     const pool = await poolPromise;
//     await pool.request().input('id', sql.Int, id).query('DELETE FROM Tasks WHERE id = @id');
//   }
// };

// module.exports = Task;
const db = require('../db'); // SQL Server connection pool

exports.getAllVoters = async () => {
  const result = await db.query(`SELECT * FROM Voters`);
  return result.recordset;
};

exports.getVoterById = async (id) => {
  const result = await db.query(`SELECT * FROM Voters WHERE VoterID = @id`, { id });
  return result.recordset[0];
};

exports.createVoter = async (name, email) => {
  await db.query(`EXEC CreateVoter @name, @email`, { name, email }); // Stored Procedure
};

exports.updateVoter = async (id, name, email) => {
  await db.query(`UPDATE Voters SET Name = @name, Email = @email WHERE VoterID = @id`, { id, name, email });
};

exports.deleteVoter = async (id) => {
  await db.query(`DELETE FROM Voters WHERE VoterID = @id`, { id });
};

