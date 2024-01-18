import httpStatus from "http-status";
import roomService from "../services/room.service.js";

const createRoom = async (payload) => {
  try {
    const response = await roomService.createRoom(payload);
    if (response) {
      return { isSuccess: true, message: response };
    }
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

const getAllRooms = async (req, res) => {
  try {
    const response = await roomService.getAllRooms();
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

const getRoomById = async (req, res) => {
  try {
    const response = await roomService.getRoomById(req);
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

const editRoom = async (req, res) => {
  try {
    const response = await roomService.editRoom(req);
    if (response) {
      return { isSuccess: true, message: response };
    }
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

const deleteRoom = async (req, res) => {
  try {
    console.log(req.body);
    const response = await roomService.deleteRoom(req);

    if (response)
      return res.status(httpStatus.BAD_REQUEST).json({
        message: response,
      });
    return res.status(httpStatus.OK).json({
      message: response,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export default { createRoom, getAllRooms, getRoomById, editRoom, deleteRoom };
