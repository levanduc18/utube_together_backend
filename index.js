import cors from "cors";
import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import dbconnection from "./src/config/dbconnection.js";
import authRoute from "./src/routes/auth.route.js";
import roomRoute from "./src/routes/room.route.js";
import session from "express-session";
import passport from "passport";
import { Server } from "socket.io";
import roomController from "./src/controllers/room.controller.js";
import Room from "./src/models/room.model.js";
import bcrypt from "bcryptjs";

dotenv.config();
dbconnection();

const app = express();
const httpServer = createServer(app);

// Create socket io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);

let options = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  name: "MyUtubeTogetherCookie",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: false,
  },
};

app.use(session(options));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: [
      "https://levanduc18.github.io/utube-together",
      "https://levanduc18.github.io",
      // "http://localhost:8080",
    ],
  })
);

app.use("/auth", authRoute);
app.use("/room", roomRoute);

// Socket server
io.on("connection", (socket) => {
  console.log("Co user ket noi!");

  socket.on("createRoom", async (data) => {
    const response = await roomController.createRoom(data);
    if (response.isSuccess) io.emit("createdRoom", response.message);
    else socket.emit("error", response.message);
  });

  socket.on("joinRoom", async (data) => {
    const currentRoom = await Room.findById(data.room);
    if (bcrypt.compareSync(data.password, currentRoom?.password)) {
      if (currentRoom) socket.leave(currentRoom);
      socket.join(data.room);
      io.to(data.room).emit("joinedRoom", {
        user: data.name,
        roomId: data.room,
      });
    } else socket.emit("error", "Incorrect password!");
  });

  socket.on("leaveRoom", async (data) => {
    io.to(data.room).emit("leavedRoom", {
      user: data.name,
      roomId: data.room,
    });
    socket.leave(data.room);
  });

  socket.on("changeVideoUrl", async (data) => {
    const response = await roomController.editRoom(data);
    console.log(response);
    if (response.isSuccess)
      io.to(data.room).emit("changedVideoUrl", {
        user: data.name,
        link: data.link,
        room: data.room,
      });
    else socket.emit("error", response.message);
  });

  socket.on("videoChangeState", async (data) => {
    io.to(data.room).emit("getVideoChangeState", {
      user: data.user,
      status: data.status,
      currentTime: data.currentTime,
      room: data.room,
      userName: data.userName,
    });
  });

  socket.on("sendMessage", async (data) => {
    io.to(data.room).emit("receivedMessage", {
      user: data.user,
      message: data.message,
      avatar: data.avatar,
      createdAt: data.createdAt,
    });
  });

  socket.on("disconnecting", () => {
    console.log("Dang ngat...");
    socket.emit("clientdisconnecting", {});
  });

  socket.on("disconnect", () => {
    console.log("Da ngat");
  });
});
const port = process.env.PORT || 3000;

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
