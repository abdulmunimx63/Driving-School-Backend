const bcrypt = require("bcrypt");
const User = require("../models/User");
const { uploadFile, getUrl } = require("../utils/fileUpload");

// Update Logged In User Profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      surName,
      address,
      city,
      country,
      dob,
      licenseCategory,
      nativeLanguage,
      contactNo,
      whatsappNo,
    } = req.body;
    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        surName,
        address,
        city,
        country,
        dob,
        licenseCategory,
        nativeLanguage,
        contactNo,
        whatsappNo,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

//Update Logged In User Password
exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    let user = await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Current Password is not Matched!",
      });

    const salt = await bcrypt.genSalt(10);

    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: await bcrypt.hash(newPassword, salt),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "Invalid Password Update",
      });
    } else {
      res.status(200).json({
        data: updatedUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

//Update Logged In User Profile Photo
exports.updateProfilePhoto = async (req, res) => {
  try {
    let url = await uploadFile(req.files.profilePhoto);
    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePhoto: req.files.profilePhoto.name,
      },
      { new: true }
    );

    let profilePhotoPath = await getUrl(updatedUser.profilePhoto);
    console.log("photo", profilePhotoPath);
    updatedUser.profilePhoto = profilePhotoPath;

    if (!updatedUser) {
      return res.status(404).send({
        message: "Invalid Photo Update",
      });
    } else {
      res.status(200).json({
        data: updatedUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
