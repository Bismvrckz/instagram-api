const express = require("express");
const { getInbox } = require("../../components/IgApiClient/get.inbox");
const { users } = require("../../../models");
const router = express.Router();

async function getInboxRouterFunction(req, res, next) {
  try {
    const { username } = req.query;

    const resFindOne = await users.findOne({ where: { username } });
    const { jsonSession } = resFindOne;

    const inbox = await getInbox({ jsonSession });

    console.log({ inbox });

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
