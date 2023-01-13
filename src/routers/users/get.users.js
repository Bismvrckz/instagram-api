const express = require("express");
const { getInbox } = require("../../components/InstagramGraphApi/get.inbox");
const router = express.Router();

async function getInboxRouterFunction(req, res, next) {
  try {
    const { page_access_token } = req.query;

    const { data, error } = await getInbox({ page_access_token });

    if (error) {
      throw error;
    }

    res.send({
      status: "Success",
      httpCode: 200,
      inbox: data,
    });
  } catch (error) {
    next(error);
  }
}

router.get("/inbox", getInboxRouterFunction);

module.exports = router;
