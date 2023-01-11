const express = require("express");
const { axiosFacebookInstance } = require("../../../axiosInstance");
const { prePostImageFunction } = require("../../components/middleware");
const { saveImage } = require("../../components/multer");
const router = express.Router();
const path = require("path");
const appRoot = require("app-root-path");
require("dotenv").config();

async function postImageRouterFunction(req, res, next) {
  try {
    const { user_id, access_token, page_id } = req.query;
    const { image_file_id, image_extension } = req;
    const { SERVER_URL } = process.env;

    const resSendImage = await axiosFacebookInstance.post(
      `${page_id}/messages?recipient={id: ${user_id}}&message={'attachment':{'type':'image','payload':{'url':'${SERVER_URL}/public/messages/images/${image_file_id}.${image_extension}'}}}&access_token=${access_token}`
    );

    console.log(resSendImage.data);

    res.send({
      status: "Success",
      httpCode: 200,
      detail: resSendImage.data,
    });
  } catch (error) {
    console.log(error.response);
    next(error);
  }
}

router.post(
  "/image",
  prePostImageFunction,
  saveImage.single("image"),
  postImageRouterFunction
);

module.exports = router;
