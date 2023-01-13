const { app, serverInstance } = require("./components/socket.io");
const appRoot = require("app-root-path");
const express = require("express");
const cors = require("cors");
const path = require("path");

const publicPath = express.static(path.join(appRoot.path, "public"));
const messagesRouter = require("./routers/messages");
const webhookRouter = require("./routers/webhook/index");
const signInRouter = require("./routers/signIn");
const usersRouter = require("./routers/users");
require("dotenv").config();

(async () => {
  try {
    const { API_PORT } = process.env;
    const PORT = API_PORT || 8000;
    app.use(cors());
    app.use(express.json());

    app.use("/public", publicPath);
    app.use("/users", usersRouter);
    app.use("/signIn", signInRouter);
    app.use("/messages", messagesRouter);
    app.use("/webhook", webhookRouter);

    app.use((error, req, res, next) => {
      error.response ? console.log(error.message) : console.log({ error });
      error.errorMessage ? "" : (error.errorMessage = error.message);

      const errorObj = {
        status: "Error",
        message: error.errorMessage,
        detail: error.response ? error.response.data : error,
      };

      const httpCode = typeof error.code == "number" ? error.code : 500;
      res.status(httpCode).send(errorObj);
    });

    serverInstance.listen(PORT, async (error) => {
      if (error) {
        console.log(`ERROR: ${error}`);
      } else {
        console.log(`SERVER RUNNING at ${PORT} ✅`);
      }
    });
  } catch (error) {
    console.log({ error });
  }
})();
