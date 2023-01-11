const express = require("express");
const { getInbox } = require("../../components/InstagramGraphApi/get.inbox");
const { users } = require("../../../models");
const router = express.Router();

async function getInboxRouterFunction(req, res, next) {
  try {
    const { page_id, page_access_token } = req.query;

    const inbox = await getInbox({ page_id, page_access_token });

    res.send({
      status: "Success",
      httpCode: 200,
      inbox,
    });
  } catch (error) {
    next(error);
  }
}

router.get("/inbox", getInboxRouterFunction);

module.exports = router;
