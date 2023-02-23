"use strict";
const mongoose = require("mongoose");

const { Schema } = mongoose;

const WaitSchema = new Schema({
  AccountId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  numericalOrder: { type: Number, required: true },
  RoomId: { type: Number, required: true, ref: "Room" },
  MedicalForm: [
    { Diagnostic: { type: String } },
    {
      DrugName: { type: String },
      Amount: { type: Number },
      timesPerDay: { type: Number },
      Dosage: { type: String },
    },
  ],
  isCurrent: { type: Boolean, required: true, default: true },
});

const Wait = mongoose.model("Wait", WaitSchema);

module.exports = Wait;
