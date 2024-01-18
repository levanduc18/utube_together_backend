import User from "../models/user.model.js";

const getProfile = async (userData) => {
  const { user } = userData;
  return await User.findById(user.id).select("-__v");
};

export default { getProfile };
