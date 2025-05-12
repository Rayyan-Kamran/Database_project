const sql = require("../config/db");

exports.verifyVoter = async (req, res) => {
  const { VoterID } = req.params;
  try {
    await sql.query`UPDATE Voters SET IsVerified = 1 WHERE VoterID = ${VoterID}`;
    res.json({ message: "Voter verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createVoter = async (req, res) => {
  res.send("Voter created successfully.");
};

exports.getAllVoters = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Voters`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};