import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    name: {
      type: String,
      trim: true,
      require: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model("User", userSchema);

export default User;
