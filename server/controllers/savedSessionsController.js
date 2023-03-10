const Session = require("../model/Session");

const getAllSessions = async (req, res) => {
  const allSessions = await Session.find();
  if (allSessions.length === 0) return res.sendStatus(204);
  res.json(allSessions);
};

const createNewSession = async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId)
    return res.status(400).json({ message: "SessionId required" });

  try {
    // check if have duplicate sessionId
    const existingSession = await Session.findOne({ sessionId });
    if (existingSession) {
      return res.status(400).json({
        message: `Session with sessionId ${sessionId} already exists`,
      });
    } else {
      // if not, create new seesion
      await Session.create({ sessionId });
      res
        .status(201)
        .json({ message: `Session ${sessionId} created successfully` });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Error creating session", details: err.details });
  }
};

const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { objects, parkingNum, buildingNum } = req.body;

  if (!objects || !sessionId)
    return res.status(400).json({ message: "SessionId and objects required" });

  try {
    const updatedSession = await Session.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          objects: objects,
          parkingNum: parkingNum,
          buildingNum: buildingNum,
        },
      },
      { new: true }
    );
    if (!updatedSession) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error updating session", details: err.details });
  }
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId)
    return res.status(400).json({ message: "SessionId required" });

  try {
    const { deletedCount } = await Session.deleteOne({ sessionId });
    if (deletedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting session", details: err.details });
  }
};

const getSession = async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId)
    return res.status(400).json({ message: "SessionId required" });

  const foundSession = await Session.findOne({ sessionId });
  try {
    if (!foundSession) {
      return res.sendStatus(404);
    }
    res.json(foundSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error finding session ${sessionId}`,
      details: err.details,
    });
  }
};

module.exports = {
  getAllSessions,
  createNewSession,
  updateSession,
  deleteSession,
  getSession,
};
