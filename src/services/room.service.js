import Room from "../models/room.model.js";
import bcrypt from "bcryptjs";

const createRoom = async (userData) => {
  const { name, owner, ownerId, password, picture } = userData;
  const newRoom = new Room({
    name,
    owner,
    password,
    picture,
    ownerId,
  });
  if (password) {
    const salt = await bcrypt.genSalt(10);
    newRoom.password = await bcrypt.hashSync(password, salt);
  }
  await newRoom.save();

  return { ...newRoom._doc, password: undefined, __v: undefined };
};

export const getAllRooms = async () => {
  return await Room.find().select(["-password"]).sort({ createdAt: -1 });
};

export const getRoomById = async (userData) => {
  return await Room.findById(userData.params.id).select(["-password"]);
};

export const editRoom = async (userData) => {
  await Room.findByIdAndUpdate(userData.room, { currentVideo: userData.link });
  return "Edited room";
};

export const deleteRoom = async (userData) => {
  const currentRoom = await Room.findById(userData.params.id);
  if ((currentRoom.ownerId = userData.body.ownerId)) {
    await Room.findByIdAndDelete(userData.params.id);
  } else return "Can't delete, you are not owner!";
};

export default { createRoom, getAllRooms, getRoomById, editRoom, deleteRoom };
