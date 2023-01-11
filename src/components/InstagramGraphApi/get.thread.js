const { axiosFacebookInstance } = require("../../../axiosInstance");

async function getMessages() {
  try {
    const res = await axiosFacebookInstance.get(
      "/aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6MTc4NDE0NDg4ODU3MDg2OTk6MzQwMjgyMzY2ODQxNzEwMzAwOTQ5MTI4MzQ0MDk2NTIwNTg3NzA5?access_token=EABRF7uDAze8BADKuDw8ZAnGQhyEWxQtjSG0YoZB2ZAmf2vqRWpRjDI7yQCbWBldm5OXSeRNKCvjgD62S6OYarHhWa1itsCfhbUQCDwvD48ECzgVCbhSuV3o7CdDCEAqPSZCfc2uB16rXVEpCKYy0XYy8dtSEe2aruR0WOs4N1lU9hsNFR6q1fW1ZBAJV3NHPZC6J7jVlei7mchjoQFWP40VnkZCOUf9ZBT4ZD"
    );
    console.log(res);
  } catch (error) {
    return { error };
  }
}

// getMessages();

module.exports = { getMessages };
