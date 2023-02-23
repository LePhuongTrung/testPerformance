"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
/**
 * It connects to the database and returns a promise.
 */
// let connectingString = `mongodb+srv://Trung:kAg6GRTOxyEUBilP@hospital.an9yerz.mongodb.net/Hospital?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    const value = mongoose.connect(process.env.MongoDB_Link_Connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (value)
      console.log(
        `Connected to database successfully, listening on http://localhost:${process.env.DEV_PORT}`
      );
  } catch (error) {
    console.error(
      "🚀 ~ file: connect.js ~ line 14 ~ connectDatabase ~ error",
      error
    );
  }
};
/**
 * It closes the connection to the database.
 */
const disconnectDatabase = async () => {
  try {
    const value = await mongoose.connection.close();
    if (value) console.log("Disconnected from database successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
