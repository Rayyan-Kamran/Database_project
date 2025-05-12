// const express = require('express');
// const router = express.Router();
// const voterController = require('../controllers/voterconroller');

// const { body, validationResult } = require('express-validator');

// // ✅ CREATE VOTER (with validation)
// router.post('/voters',
//   [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('A valid email is required'),
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
//   voterController.createVoter
// );
// console.log("Loaded voterController:", voterController);

// // ✅ Other CRUD Routes
// router.get('/voters', voterController.getAllVoters);
// //router.get('/voters/:id', voterController.getVoterById);
// //router.put('/voters/:id', voterController.updateVoter);
// //router.delete('/voters/:id', voterController.deleteVoter);
// module.exports = router;
const express = require('express');
const router = express.Router();

 const voterController = require('../controllers/votorcontroller');
// const authController = require('../controllers/authcontrol'); // ✅ Import auth controller
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authcontrol');



// ✅ AUTH ROUTES
router.post('/register', authController.registerVoter);
router.post('/login', authController.loginVoter);

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
// router.get('/voters/:id', voterController.getVoterById);
// router.put('/voters/:id', voterController.updateVoter);
// router.delete('/voters/:id', voterController.deleteVoter);

module.exports = router;
