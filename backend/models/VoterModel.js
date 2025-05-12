const db = require('../db'); 

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

