const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getNoOfUnitsPerLevel = require("../config/noOfUnits");

const customCorridorSettingsSchema = new Schema({
  clusterType: {
    type: String,
    default: "",
  },
  noOfFloors: {
    type: Number,
    default: 1,
  },
  noOfUnitsArr: {
    type: [Number],
    default: [0, 0, 0, 0],
  },
  corridorWidth: {
    type: Number,
    default: 3,
  },
  pairDist: {
    type: Number,
    default: 25,
  },
  rectilinearInitialDist: {
    type: Number,
    default: -15,
  },
  slideDist: {
    type: Number,
    default: 0,
  },
});

const customConnectingRoadSettingsSchema = new Schema({
  roadType: {
    type: String,
    default: "",
  },
  length: {
    type: Number,
    default: 1,
  },
});

const customAmenitySettingsSchema = new Schema({
  children: {
    type: Boolean,
    default: false,
  },
  adult: {
    type: Boolean,
    default: false,
  },
  elderly: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String,
    default: "",
  },
});
const customCarparkSettingsSchema = new Schema({
  roof: {
    type: String,
    default: "",
  },
  ground: {
    type: String,
    default: "",
  },
  length: {
    type: Number,
    default: 1,
  },
  level: {
    type: Number,
    default: 1,
  },
});
const customLandscapeSettingsSchema = new Schema({
  shape: {
    type: String,
    default: "",
  },

  length: {
    type: Number,
    default: 1,
  },
  width: {
    type: Number,
    default: 1,
  },
  radius: {
    type: Number,
    default: 1,
  },
  density: {
    type: Number,
    default: 1,
  },
  sizeVariation: {
    type: Number,
    default: 1,
  },
  displacement: {
    type: Number,
    default: 1,
  },
});

const customSettingsSchema = new Schema({
  customCorridorSettings: customCorridorSettingsSchema,
  customConnectingRoadSettings: customConnectingRoadSettingsSchema,
  customAmenitySettings: customAmenitySettingsSchema,
  customCarparkSettings: customCarparkSettingsSchema,
  customLandscapeSettings: customLandscapeSettingsSchema,
});

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
  customSettings: customSettingsSchema,
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
