const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/voters", require("./routes/voteRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

module.exports = app;
