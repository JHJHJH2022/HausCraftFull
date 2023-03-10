const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getNoOfUnitsPerLevel = require("../config/noOfUnits");

const objectSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  typology: {
    type: String,
    required: true,
  },
  position: {
    type: [Number],
    default: [0, 0, 0],
  },
  rotation: {
    type: [Number],
    default: [0, 0, 0],
  },
  levels: {
    type: Number,
    default: 1,
  },
  unitsPerLevel: {
    // this is auto calculated based on typology
    type: Number,
    // set: function () {
    //   return getNoOfUnitsPerLevel(this.typology);
    // },
  },
});

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    unique: true,
    required: true,
  },
  parkingNum: {
    type: Number,
    default: 0,
  },
  buildingNum: {
    type: Number,
    default: 0,
  },
  objects: [objectSchema],
});

module.exports = mongoose.model("Session", sessionSchema);
