const mongoose = require("mongoose");

// const MONGOURI = "mongodb://localhost:27017/driving-test";
const MONGOURI =
  "mongodb+srv://admin:q6FnHpvIRjZzPoFE@cluster0.ooqsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const MONGOURI =
//   "mongodb+srv://Hasnain:H@snain33@darpatente.fubfmdo.mongodb.net/?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
