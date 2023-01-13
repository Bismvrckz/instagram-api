const { axiosFacebookInstance } = require("../../../axiosInstance");

async function getInbox({ page_access_token }) {
  try {
    const { data } = await axiosFacebookInstance.get(
      `/me/conversations?access_token=${page_access_token}&fields=id,name,messages.limit(10){created_time,from,id,message,to,is_unsupported,sticker,shares.limit(10){description,id,link,name,template},story,tags,thread_id,attachments.limit(10){id,image_data,mime_type,name,video_data,size,file_url},reactions.limit(10)},message_count,senders,subject,link&platform=instagram`
    );

    return data;
  } catch (error) {
    return { error: error.response.data };
  }
}

module.exports = { getInbox };
