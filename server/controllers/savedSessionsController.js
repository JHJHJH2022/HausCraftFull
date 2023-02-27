const Session = require("../model/Session");

const getAllSessions = async (req, res) => {
  const allSessions = await Session.find();
  if (!allSessions)
    return res.status(204).json({ message: "No design sessions found" });
  res.json(allSessions);
};

const createNewSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    // check if have duplicate sessionId
    const duplicateSession = await Session.findOne({ sessionId });
    if (duplicateSession) {
      res.json({ message: "Session with the same sessionId already exists" });
    } else {
      // if not, create new seesion
      await Session.create({ sessionId });
      res.send({ message: `Session ${sessionId} created successfully` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating session" });
  }
};

const updateSession = async (req, res) => {
  const { sessionId, objects } = req.body;
  try {
    const updatedSession = await Session.findOneAndUpdate(
      { sessionId },
      { $set: { objects: objects } }
    );
    if (!updatedSession) {
      res.status(404).send({ message: "Session does not exist" });
    } else {
      res.send({ message: "Session updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating session" });
  }
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const { deletedCount } = await Session.deleteOne({ sessionId });
    if (deletedCount === 0) {
      res.status(404).send({ message: "Session does not exist" });
    } else {
      res.send({ message: "Session deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting session" });
  }
};

const getSession = async (req, res) => {
  const { sessionId } = req.params;
  const foundSession = await Session.findOne({ sessionId });
  try {
    if (!foundSession) {
      res.status(404).send({ message: "Session does not exist" });
    } else {
      res.json(foundSession);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error finding session ${sessionId}` });
  }
};

module.exports = {
  getAllSessions,
  createNewSession,
  updateSession,
  deleteSession,
  getSession,
};
