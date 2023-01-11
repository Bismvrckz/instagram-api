const { default: axios } = require("axios");

const API_URL =
  process.env.FACEBOOK_API_URL || "https://graph.facebook.com/v15.0/";

const axiosFacebookInstance = axios.create({ baseURL: API_URL });

module.exports = { axiosFacebookInstance };
