const { update_front_end } = require("../socket.io");

async function webhookHandlerFunction({ entry }) {
  try {
    entry.forEach((entity) => {
      const { messaging, changes } = entity;

      if (changes) {
        return changes.forEach((each) => {
          update_front_end({ event: each });
        });
      }

      if (messaging) {
        return messaging.forEach((each) => {
          update_front_end({ event: each });
        });
      }
    });
  } catch (error) {
    return { error };
  }
}

module.exports = { webhookHandlerFunction };
