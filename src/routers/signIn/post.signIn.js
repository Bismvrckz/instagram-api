const express = require("express");
const router = express.Router();
const { get_user_pages } = require("../../components/InstagramGraphApi");
require("dotenv").config();

async function SignInRouterFunction(req, res, next) {
  try {
    // const resFetch = await fetch("https://connect.facebook.net/en_US/sdk.js");

    // console.log(resFetch.body, { resFetch });

    // resFetch.init({
    //   appId: 5706391809478127,
    //   autoLogAppEvents: true,
    //   xfbml: true,
    //   version: "v15.0",
    // });

    const { access_token } = req.body;
    const { APP_ID, APP_SECRET } = process.env;

    const { user_pages, error } = await get_user_pages({
      access_token,
      app_id: APP_ID,
      app_secret: APP_SECRET,
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

router.post("/instagram", SignInRouterFunction);

module.exports = router;
