const sql = require("../config/db");

exports.castVote = async (req, res) => {
  const { VoterID, CandidateID, ElectionID } = req.body;
  try {
    const check = await sql.query`
      SELECT * FROM Votes WHERE VoterID = ${VoterID} AND ElectionID = ${ElectionID}`;
    if (check.recordset.length > 0) {
      return res.status(400).json({ message: "You have already voted in this election." });
    }
    await sql.query`
      INSERT INTO Votes (VoterID, CandidateID, ElectionID, VoteTimestamp)
      VALUES (${VoterID}, ${CandidateID}, ${ElectionID}, GETDATE())`;
    res.json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.someController = (req, res) => {
  res.send("Working!");
};

exports.getResults = async (req, res) => {
  const { ElectionID } = req.params;
  try {
    const result = await sql.query`
      SELECT C.CandidateID, C.FullName, C.PartyName, COUNT(V.VoteID) AS TotalVotes
      FROM Candidates C
      LEFT JOIN Votes V ON C.CandidateID = V.CandidateID
      WHERE C.ElectionID = ${ElectionID}
      GROUP BY C.CandidateID, C.FullName, C.PartyName
      ORDER BY TotalVotes DESC`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
