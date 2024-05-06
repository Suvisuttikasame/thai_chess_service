import { Server } from "socket.io";
import { findOpponentEvent } from "./events/find_opponent";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const init = () => {
  io = new Server({
    /* options */
  });

  io.on("connection", (socket) => {
    console.log("user id: ", socket.id, " is connected!");
    socket.on("find-opponent", (data) => {
      findOpponentEvent(data, socket, io);
    });

    socket.on("disconnect", () => {
      console.log("user id: ", socket.id, " is disconnected!");
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("IO is not instanciated.");
  }
  return io;
};
