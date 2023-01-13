const { axiosFacebookInstance } = require("../../../axiosInstance");
const express = require("express");
const router = express.Router();

async function sendMessageRouterFunction(req, res, next) {
  try {
    const { text, user_id, access_token } = req.body;

    const resSendMessage = await axiosFacebookInstance.post(
      `/me/messages?recipient={"id":"${user_id}"}&message={"text":"${text}"}&access_token=${access_token}&messaging_type=MESSAGE_TAG&tag=HUMAN_AGENT`
    );

    res.send({
      status: "Success",
      httpCode: 200,
      sentMessage: resSendMessage.data,
    });
  } catch (error) {
    next(error);
  }
}

router.post("/textMessage", sendMessageRouterFunction);

module.exports = router;
