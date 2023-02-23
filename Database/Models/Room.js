"use strict";
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const {
  internalDiseases,
  surgicalDisease,
  obstetrics,
  emergency,
  Infectious,
} = require("../../constants/typeSick");

const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomNumber: { type: Number, required: true, unique: true },
  type: {
    type: String,
    enum: [
      internalDiseases,
      surgicalDisease,
      obstetrics,
      emergency,
      Infectious,
    ],
    default: internalDiseases,
  },
  CurrentNumber: { type: Number, required: true, default: 0 },
  TotalNumber: { type: Number, required: true, default: 0 },
  isPrioritized: { type: Boolean, required: true, default: false },
});

RoomSchema.plugin(mongoosePaginate);
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
