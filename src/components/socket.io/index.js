const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();

const serverInstance = http.createServer(app);

const io = new Server(serverInstance, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function update_front_end({ event }) {
  try {
    io.emit(`update_new:${event.recipient.id}`, { event });

    console.log(`updated_new:${event.recipient.id}`);
  } catch (error) {
    console.log({ error });
  }
}

module.exports = { update_front_end, app, serverInstance };
