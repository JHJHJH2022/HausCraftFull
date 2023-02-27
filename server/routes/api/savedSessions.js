const express = require("express");
const router = express.Router();
const {
  getAllSessions,
  createNewSession,
  updateSession,
  deleteSession,
  getSession,
} = require("../../controllers/savedSessionsController");

router
  .route("/")
  .get(getAllSessions)
  .post(createNewSession)
  .put(updateSession)
  .delete(deleteSession);

router.route("/:sessionId").get(getSession);

module.exports = router;
