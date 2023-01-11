const express = require("express");
const router = express.Router();
const { users } = require("../../../models");
const { get_user_pages } = require("../../components/InstagramGraphApi");

async function SignInRouterFunction(req, res, next) {
  try {
    const { access_token, app_id, app_secret } = req.body;

    const { user_pages, error } = await get_user_pages({
      access_token,
      app_id,
      app_secret,
    });

    if (error) throw error;

    const { data } = user_pages;

    res.send({
      status: "Success",
      httpCode: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function LoginInstagramPrivateApiFunction(req, res, next) {
  try {
    const { username, password } = req.body;

    console.log({ username, password });

    res.send({
      status: "Success",
      httpCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

router.post("/instagram-private-api", LoginInstagramPrivateApiFunction);
router.post("/instagram", SignInRouterFunction);

module.exports = router;
