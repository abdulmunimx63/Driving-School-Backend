const Lesson = require("../models/Lesson");
const Quizz = require("../models/Quizz");
const QuizzAnswer = require("../models/QuizzAnswer");
const QuizzQuestion = require("../models/QuizzQuestion");
const QuizzReport = require("../models/QuizzReport");
const { uploadFileBase64Format, getUrl } = require("../utils/fileUpload");

// Create and Save a new quizz
exports.create = async (req, res) => {
  try {
    const quizz = new Quizz({
      chapter: req.body.chapter,
    });
    const newQuizz = await quizz.save();

    const questions = JSON.parse(req.body.questions);

    for (let i = 0; i < questions.length; i++) {
      const result = await uploadFileBase64Format(
        questions[i].questionImage,
        questions[i].questionImageName
      );
      const quizzQuestion = new QuizzQuestion({
        questionText: questions[i].questionText,
        questionImage: questions[i].questionImageName,
      });

      const newQuestion = await quizzQuestion.save();

      await Quizz.findByIdAndUpdate(
        newQuizz._id,
        { $push: { quizzQuestions: newQuestion._id } },
        { new: true, useFindAndModify: false }
      );

      let answers = questions[i].quizzAnswers;

      answers.map(async (ans) => {
        const quizzAnswer = new QuizzAnswer({
          answer: ans.answer,
          status: ans.status,
        });
        const newQuizzAnswer = await quizzAnswer.save();

        await QuizzQuestion.findByIdAndUpdate(
          newQuestion._id,
          { $push: { quizzAnswers: newQuizzAnswer._id } },
          { new: true, useFindAndModify: false }
        );
      });
    }

    res.status(200).json({
      message: "Quizz created successfully!",
      data: newQuizz,
    });
  } catch (error) {
    console.log("errro", error);
    res.status(400).json({
      error: error,
    });
  }
};

// Retrieve all lessons from the database.
exports.index = async (req, res) => {
  try {
    let quizzes = await Quizz.find()
      .populate("chapter")
      .populate({
        path: "quizzQuestions",
        populate: {
          path: "quizzAnswers",
        },
      });

    const processedQuizzes = [];

    if (quizzes) {
      for (let i = 0; i < quizzes[0].quizzQuestions.length; i++) {
        let url = await getUrl(quizzes[0].quizzQuestions[i].questionImage);
        quizzes[0].quizzQuestions[i].questionImage = url;
        quizzes[0].quizzQuestions[i].selectedAnswer = '';
        processedQuizzes.push(quizzes[0]);
      }
    }

    res.status(200).json({
      message: "Quizzes fetched successfully!",
      data: quizzes,
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      error: err.message,
    });
  }
};

// Find a single lesson with an id
exports.view = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id).populate("chapter");
    res.status(200).json({
      message: "Lesson fetched successfully!",
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Update a lesson by the id in the request
exports.update = async (req, res) => {
  try {
    let updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        chapter: req.body.chapterId,
      },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).send({
        message: "Lesson not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedLesson,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a lesson with the specified id in the request
exports.delete = async (req, res) => {
  try {
    let lesson = await Lesson.findByIdAndRemove(req.params.id);
    if (!lesson) {
      return res.status(404).send({
        message: "Task not found with id " + req.params.id,
      });
    }
    res.send({ message: "Lesson deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Submit quizz
exports.submitQuizz = async (req, res) => {
  try {
    let quizz = await Quizz.findOne({ _id: req.body.quizzId }).populate({
      path: "quizzQuestions",
      populate: {
        path: "quizzAnswers",
      },
    });

    let userAnsweredQuestions = JSON.parse(req.body.questionsData);
    let quizzQuestions = quizz.quizzQuestions;
    let correctAnswers = 0;

    for (let i = 0; i < userAnsweredQuestions.length; i++) {
      let question = userAnsweredQuestions[i];
      const result = quizzQuestions.find(q => q._id == question.questionId);
      const answer = result.quizzAnswers.find(a => a._id == question.selectedAnswerId);
      if (answer.status == true) {
        correctAnswers += 1;
      }
    }

    const quizzReport = new QuizzReport({
      quizz: req.body.quizzId,
      user: req.user.id,
      totalQuestions: quizz.quizzQuestions.length,
      correctQuestions: correctAnswers
    });

    const newQuizzReport = await quizzReport.save();

    res.status(200).json({
      message: "Quizz submitted successfully!",
      data: newQuizzReport,
    });
  } catch (error) {
    console.log("errro", error);
    res.status(400).json({
      error: error,
    });
  }
};
