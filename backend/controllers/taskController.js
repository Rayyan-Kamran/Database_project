// const Task = require('../models/taskModel');

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.getAllTasks();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getTaskById = async (req, res) => {
//   try {
//     const task = await Task.getTaskById(req.params.id);
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// exports.createTask = async (req, res) => {
//     try {
//       const { title, description} = req.body;
//       await Task.createTask(title, description);
//       res.status(201).json({ message: 'Task created using stored procedure' });
//     } catch (error) {
//       console.error("Error creating task:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  

// exports.updateTask = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     await Task.updateTask(req.params.id, title, description);
//     res.json({ message: 'Task updated' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     await Task.deleteTask(req.params.id);
//     res.json({ message: 'Task deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
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
