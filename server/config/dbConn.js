const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "DesignSessions", // need to specify which database  to modify, otherwise mongDB automatically create a database called "test"
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
