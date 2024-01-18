import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    currentVideo: { type: String, trim: true },
    owner: {
      type: String,
      trim: true,
      require: true,
    },
    ownerId: { type: String, trim: true, require: true },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    picture: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

roomSchema.set("toJSON", { virtuals: true });
const Room = mongoose.model("Room", roomSchema);

export default Room;
