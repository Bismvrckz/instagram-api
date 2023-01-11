const { axiosFacebookInstance } = require("../../../axiosInstance");

async function get_user_pages({ access_token, app_id, app_secret }) {
  try {
    const long_access_token = await axiosFacebookInstance.get(
      `/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`
    );

    const user_pages = await axiosFacebookInstance.get(
      `/me/accounts?platform=instagram&access_token=${long_access_token.data.access_token}&fields=name,id,access_token`
    );

    return {
      user_pages,
    };
  } catch (error) {
    return { error };
  }
}

module.exports = { get_user_pages };
