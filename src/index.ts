import { Server } from "socket.io";

const rooms: Room[] = [];

enum RoomType {
  FIND_OPP = "find-opponent",
  FRIEND_PL = "friend-play",
}

enum RoomStatus {
  EMPTY = "empty",
  FULL = "full",
}

type Room = {
  roomId: string;
  type: RoomType;
  status: RoomStatus;
  player1: string;
  player2?: string;
  turn: string;
};

const io = new Server({
  /* options */
});

io.on("connection", (socket) => {
  console.log("user id: ", socket.id, " is connected!");
  socket.on("find-opponent", (data) => {
    console.log("to do test for ", data);
    const jsonData: { playerId: string } = JSON.parse(data);
    // find the 'find-opponent' room that empty
    const emptyRoomIndex = rooms.findIndex((room) => {
      return room.status === RoomStatus.EMPTY;
    });

    //if it's existed, join room start game
    if (emptyRoomIndex >= 0) {
      rooms[emptyRoomIndex].player2 = jsonData.playerId;
      rooms[emptyRoomIndex].status = RoomStatus.FULL;

      socket.join(rooms[emptyRoomIndex].roomId);
      io.emit("join-room-success", {
        roomId: rooms[emptyRoomIndex].roomId,
        message: "Let have fun!",
      });

      return;
    }

    //else create 'find-opponent' empty room
    socket.join(jsonData.playerId);
    io.emit("create-room-success", {
      roomId: jsonData.playerId,
      message: "waiting for opponent...",
    });
    const newRoom: Room = {
      roomId: jsonData.playerId,
      type: RoomType.FIND_OPP,
      status: RoomStatus.EMPTY,
      player1: jsonData.playerId,
      turn: "trun",
    };
    rooms.push(newRoom);
  });

  socket.on("disconnect", () => {
    console.log("user id: ", socket.id, " is disconnected!");
  });
});

io.listen(3000);
