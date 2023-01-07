const { IgApiClient } = require("instagram-private-api");
const ig = new IgApiClient();

async function Ig_Api_Components({ username, password }) {
  try {
    ig.state.generateDevice(username);
    await ig.simulate.preLoginFlow();
    var loggedInUser = await ig.account.login(username, password);
    // process.nextTick(async () => await ig.simulate.postLoginFlow());

    const jsonSession = await ig.state.serialize();

    const inbox = await ig.feed.directInbox().records();

    let conversations = [];

    for (const thread of inbox) {
      console.log("jalan thread", { thread: thread.threadId });

      const { threadId } = thread;
      const dialog = await ig.feed.directThread(parseInt(thread.threadId));
      const info = ig.threads.show(threadId);

      conversations.push({ dialog, threadId, info });
    }

    return { loggedInUser, ig, jsonSession, inbox, conversations };
  } catch (error) {
    return { error };
  }
}

module.exports = { Ig_Api_Components };
