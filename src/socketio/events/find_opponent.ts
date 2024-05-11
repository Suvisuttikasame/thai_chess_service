import Room, { RoomStatus, RoomType } from "../../model/room";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Player, { Side } from "../../model/player";

export const findOpponentEvent = async (
  data: { playerId: string },
  socket:
    | any[]
    | Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  let player;
  // const jsonData: { playerId: string } = JSON.parse(data);
  const jsonData = data;
  // find the 'find-opponent' room that empty
  const emptyRoom = await Room.findOne({
    status: RoomStatus.EMPTY,
  });

  //if it's existed, join room start game
  if (emptyRoom !== null) {
    //prevent access same owner room
    if (emptyRoom.roomId === jsonData.playerId) {
      socket.join(emptyRoom.roomId);
      io.to(emptyRoom.roomId).emit("create-room-success", {
        roomId: emptyRoom.roomId,
        message: "waiting for opponent...",
      });
      return;
    }
    const existPlayer = await Player.findOne({
      playerId: jsonData.playerId,
    });
    if (existPlayer === null) {
      player = await Player.create({
        playerId: jsonData.playerId,
        side: Side.BLACK,
      });
    } else {
      player = existPlayer;
    }
    emptyRoom.player2 = player;
    emptyRoom.status = RoomStatus.FULL;
    await emptyRoom.save();

    socket.join(emptyRoom.roomId);
    io.to(emptyRoom.roomId).emit("join-room-success", {
      roomId: emptyRoom.roomId,
      message: "Let have fun!",
    });

    return;
  }

  //else create 'find-opponent' empty room
  const existPlayer = await Player.findOne({
    playerId: jsonData.playerId,
  });
  if (existPlayer === null) {
    player = await Player.create({
      playerId: jsonData.playerId,
      side: Side.WHITE,
    });
  } else {
    player = existPlayer;
  }
  await Room.create({
    roomId: player.playerId,
    type: RoomType.FIND_OPP,
    status: RoomStatus.EMPTY,
    currentBoard: [],
    player1: player,
    turn: {
      player,
    },
  });
  socket.join(player.playerId);
  io.to(player.playerId).emit("create-room-success", {
    roomId: player.playerId,
    message: "waiting for opponent...",
  });
};
