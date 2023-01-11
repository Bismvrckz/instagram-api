async function prePostImageFunction(req, res, next) {
  try {
    const { user_id, image_extension } = req.query;

    req.image_file_id = `${user_id}-${new Date().getTime()}`;
    req.image_extension = image_extension;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { prePostImageFunction };
