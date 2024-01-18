import httpStatus from "http-status";
import authService from "../services/auth.service.js";

const getProfile = async (req, res) => {
  try {
    const response = await authService.getProfile(req);
    if (response) {
      return res.status(httpStatus.OK).json({
        message: response,
      });
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getAuthenticated = async (req, res) => {
  try {
    if (req.user) {
      return res.status(httpStatus.OK).json({
        message: "Authenticated",
      });
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export default { getProfile, getAuthenticated };
