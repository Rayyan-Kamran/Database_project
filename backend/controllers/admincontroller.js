const sql = require("../config/db");
const bcrypt = require("bcryptjs");

exports.loginAdmin = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Admins WHERE Username = ${Username}`;
    const admin = result.recordset[0];
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(Password, admin.PasswordHash.trim());
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Admin login successful", admin });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};