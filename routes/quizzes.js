const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const quizzes = require('../controllers/QuizzesController');

    // Create a new quizz
    router.post('/create', quizzes.create);

    // Submit quizz
    router.post('/submitQuizz', auth, quizzes.submitQuizz);

    // Retrieve all quizzes
    router.get('/index', quizzes.index);

    // Retrieve a single quizz with Id
    router.get('/view/:id', quizzes.view);

    // Update a quizz with Id
    router.put('/update/:id', quizzes.update);

    // Delete a quizz with Id
    router.delete('/delete/:id', quizzes.delete);

module.exports = router;