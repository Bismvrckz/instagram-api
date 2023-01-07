const { IgApiClient } = require("instagram-private-api");
const Instagram = require("instagram-private-api");
const randomToken = require("random-token");
const FileCookieStore = require("tough-cookie-filestore");

async function getInbox({ jsonSession }) {
  try {
    jsonSession = JSON.stringify(jsonSession);

    const sessionStorage = new Instagram.CookieFileStorage(
      new FileCookieStore(jsonSession)
    );
    const ig = new IgApiClient({ sessionStorage });

    // await ig.account.login();

    const thread = await ig.feed.directInbox().records();

    return { thread };
  } catch (error) {
    console.log({ error });
    return { error };
  }
}

module.exports = { getInbox };
