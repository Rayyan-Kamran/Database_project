// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// const { body, validationResult } = require('express-validator');

// router.post('/tasks',
//   [
//     body('title').notEmpty().withMessage('Title is required'),
//     body('description').isLength({ min: 5 }).withMessage('Description should be at least 5 characters'),
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation Errors:", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }
//     console.log("Validation Passed, Data:", req.body);
//     next();
//   },
//   taskController.createTask
// );


// router.get('/tasks', taskController.getAllTasks);
// router.get('/tasks/:id', taskController.getTaskById);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);

// module.exports = router;
const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');

const { body, validationResult } = require('express-validator');

// ✅ CREATE VOTER (with validation)
router.post('/voters',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  voterController.createVoter
);

// ✅ Other CRUD Routes
router.get('/voters', voterController.getAllVoters);
router.get('/voters/:id', voterController.getVoterById);
router.put('/voters/:id', voterController.updateVoter);
router.delete('/voters/:id', voterController.deleteVoter);

module.exports = router;
