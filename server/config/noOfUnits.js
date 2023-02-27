const getNoOfUnitsPerLevel = (typology) => {
  let units = 0;
  if (typology === "cluster1") {
    units = 10;
  } else if (typology === "cluster2") {
    units = 8;
  } else if (typology === "buildingIndiv") {
    units = 2;
  } else if (typology === "carpark") {
    units = 80;
  }
  return units;
};

module.exports = getNoOfUnitsPerLevel;
