const { IgApiClient } = require("instagram-private-api");
const appRoot = require("app-root-path");
const path = require("path");
const fs = require("fs");

async function LoadSessionInstagram() {
  try {
    const savedSession = fs.readFileSync(
      path.join(appRoot.path, "private-api-session.json")
    );

    const ig = new IgApiClient();
    await ig.state.deserialize(JSON.parse(savedSession));

    const inbox_list = await ig.feed.directInbox().records();
    const message_list = await ig.feed.directInbox().items();

    console.log({ inbox_list }, message_list[1].items[0]);
  } catch (error) {
    console.log({ error });
  }
}

module.exports = { LoadSessionInstagram };
