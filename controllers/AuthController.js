const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Country = require("../models/Country");
const fetch = require("node-fetch");

//------------------ Google-Checkbox-ReChaptch Validation Method -----------------//
const validateCaptcha = (reChaptchaToken) => {
  return new Promise((resolve, reject) => {
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reChaptchaToken}`;

    fetch(url, {
      method: "post",
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success == true) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(false);
      });
  });
};

exports.register = async (req, res) => {
  const {
    name,
    surName,
    address,
    city,
    country,
    dob,
    licenseCategory,
    nativeLanguage,
    email,
    contactNo,
    whatsappNo,
    password,
    reChaptchaToken,
  } = req.body;

  // if (!(await validateCaptcha(reChaptchaToken))) {
  //   return res.redirect(`/captcha`);
  // }
  // delete req.body["reChaptchaToken"];

  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    user = new User({
      name,
      surName,
      address,
      city,
      country,
      dob,
      licenseCategory,
      nativeLanguage,
      email,
      contactNo,
      whatsappNo,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          accessToken: token,
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    console.log("user status", user.isActive);
    if (user.isActive == 0)
      return res.status(400).json({
        message: "Your account is de activated!",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 36000000,
      },

      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          accessToken: token,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};

exports.getCountriesList = async (req, res) => {
  try {
    let country = new Country({
      country_code: req.body.country_code,
      country_name: req.body.country_name,
    });

    const newCountry = await country.save();

    // const countries = await Country.find();
    res.json(newCountry);
  } catch (e) {
    res.send({ message: "Error in fetching the countries" });
  }
};
