const Voter = require('../models/voterModel');

exports.getAllVoters = async (req, res) => {
  try {
    const voters = await Voter.getAllVoters();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getVoterById = async (req, res) => {
  try {
    const voter = await Voter.getVoterById(req.params.id);
    if (!voter) return res.status(404).json({ error: 'Voter not found' });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createVoter = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Voter.createVoter(name, email);
    res.status(201).json({ message: 'Voter created using stored procedure' });
  } catch (error) {
    console.error("Error creating voter:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateVoter = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Voter.updateVoter(req.params.id, name, email);
    res.json({ message: 'Voter updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteVoter = async (req, res) => {
  try {
    await Voter.deleteVoter(req.params.id);
    res.json({ message: 'Voter deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
