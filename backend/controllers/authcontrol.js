const sql = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerVoter = async (req, res) => {
  const { FullName, CNIC, Email, Password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    await sql.query`
      IF EXISTS (SELECT 1 FROM Voters WHERE CNIC = ${CNIC} OR Email = ${Email})
        BEGIN RAISERROR('Voter already exists', 16, 1); RETURN; END
      ELSE
        INSERT INTO Voters (FullName, CNIC, Email, PasswordHash, IsVerified)
        VALUES (${FullName}, ${CNIC}, ${Email}, ${hashedPassword}, 0)
    `;
    res.status(201).json({ message: "Voter registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginVoter = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Voters WHERE Email = ${Email}`;
    const voter = result.recordset[0];
    if (!voter) return res.status(404).json({ error: "Voter not found" });

    const isMatch = await bcrypt.compare(Password, voter.PasswordHash.trim());
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ VoterID: voter.VoterID }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}