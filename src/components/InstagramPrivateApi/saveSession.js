const { IgApiClient } = require("instagram-private-api");
const RandomToken = require("random-token");
const appRoot = require("app-root-path");
const path = require("path");
const fs = require("fs");

async function SaveSessionInstagram({ username, password }) {
  try {
    // // console.log({ username, password });
    // const ig = new IgApiClient();
    // const randomDevice = RandomToken(16);
    // ig.state.generateDevice(randomDevice);
    // const resLogin = await ig.account.login(username, password);
    // const serialized = await ig.state.serialize();
    // delete serialized.constants;
    // // console.log({ resLogin, randomDevice, serialized });
    // fs.writeFileSync(
    //   path.join(appRoot.path, "private-api-session.json"),
    //   JSON.stringify(serialized)
    // );
    // const [thread] = await ig.feed.directInbox().records();
    // const thread2 = ig.feed.directInbox();
    // thread.broadcastText("alo");
    // console.log({ thread, thread2 });

    // Instantiate the IG client
    const ig = new IgApiClient();

    const recipient = "rickertonn_";
    const savedSession = fs.readFileSync(
      path.join(appRoot.path, "private-api-session.json")
    );
    await ig.state.deserialize(JSON.parse(savedSession));

    const userID = await ig.user.getIdByUsername(recipient);

    const threadItem = await ig.feed.directInbox().items();

    const thread = ig.entity.directThread([userID.toString()]);
    console.log(threadItem[1]);
    // const sendRes = await thread.broadcastLink();

    if (Boolean(sendRes) && typeof sendRes === "object") {
      console.log(`Message successfully sent to ${recipient}.`);
    } else {
      console.log(`Failed to send message to ${recipient}.`);
    }
  } catch (error) {
    console.log({ error });
  }
}

module.exports = { SaveSessionInstagram };
