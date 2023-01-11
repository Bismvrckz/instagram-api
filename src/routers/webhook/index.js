const express = require("express");
const { webhookHandlerFunction } = require("../../components/webhookHandler");
const router = express.Router();

async function webhookInitHandlerRouterFunction(req, res, next) {
  try {
    const challenge = req.query["hub.challenge"];

    console.log({ req: req.query });

    if (challenge) {
      return res.send(challenge);
    } else {
      return res.send("Error: Missing hub.challenge");
    }
  } catch (error) {
    next(error);
  }
}

async function webhookReceiverHandlerRouterFunction(req, res, next) {
  try {
    const { entry } = req.body;
    await webhookHandlerFunction({ entry });
    res.send();
  } catch (error) {
    next(error);
  }
}

router.post("/", webhookReceiverHandlerRouterFunction);
router.get("/", webhookInitHandlerRouterFunction);

module.exports = router;
