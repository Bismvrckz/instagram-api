const express = require("express");
const router = express.Router();
const { Ig_Api_Components } = require("../../components/IgApiClient");
const { Direct } = require("instagram-private-api");
const { getInbox } = require("../../components/IgApiClient/get.inbox");
const { users } = require("../../../models");

async function signInRouterFunction(req, res, next) {
  try {
    const { username, password } = req.body;
    var { loggedInUser, ig, error, jsonSession, inbox, conversations } =
      await Ig_Api_Components({
        username,
        password,
      });

    if (error) throw error;

    // const { pk } = loggedInUser;
    // const { inbox } = await getInbox({ pk });

    // const inbox = await ig.directThread();

    const insertedUser = await users.create({
      username,
      password,
      jsonSession,
    });

    console.log({ conversations });

    res.send({
      status: "Success",
      httpCode: 200,
      jsonSession,
      conversations,
    });
  } catch (error) {
    next(error);
  } finally {
    // ig.account.logout();
  }
}

router.post("/instagram", signInRouterFunction);

module.exports = router;
