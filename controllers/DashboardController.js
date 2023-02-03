
const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Quizz = require("../models/Quizz");
const SubCategory = require("../models/SubCategory");
const User = require("../models/User");

exports.getAdminDashboardStats = async (req, res) => {
  try {
    const categories = await Category.count();
    const subCategories = await SubCategory.count();
    const courses = await Course.count();
    const chapters = await Chapter.count();
    const lessons = await Lesson.count();
    const quizzes = await Quizz.count();
    const customers = await User.count({role: 2});

    res.status(200).json({
        categories,
        subCategories,
        courses,
        chapters,
        lessons,
        quizzes,
        customers
    });

  } catch (e) {
    res.send({ message: "Error" });
  }
}