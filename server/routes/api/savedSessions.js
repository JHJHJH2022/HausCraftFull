const express = require("express");
const router = express.Router();
const {
  getAllSessions,
  createNewSession,
  updateSession,
  deleteSession,
  getSession,
} = require("../../controllers/savedSessionsController");

router.route("/").get(getAllSessions);

router
  .route("/:sessionId")
  .get(getSession)
  .post(createNewSession)
  .put(updateSession)
  .delete(deleteSession);

module.exports = router;
