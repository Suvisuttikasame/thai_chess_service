import mongoose, { Schema } from "mongoose";
import { playerSchema } from "./player";

export enum RoomType {
  FIND_OPP = "find-opponent",
  FRIEND_PL = "friend-play",
}

export enum RoomStatus {
  EMPTY = "empty",
  FULL = "full",
  CANCEL = "cancel",
}

export const roomSchema = new Schema({
  roomId: { type: String, required: true },
  type: {
    type: String,
    enum: [RoomType.FIND_OPP, RoomType.FRIEND_PL],
    required: true,
  },
  status: {
    type: String,
    enum: [RoomStatus.EMPTY, RoomStatus.FULL],
    required: true,
  },
  player1: playerSchema,
  player2: playerSchema,
  turn: {
    player: playerSchema,
  },
  currentBoard: {
    type: [{ pieceName: String, position: String, side: String }],
    required: true,
  },
});

const Room = mongoose.model("room", roomSchema);
export default Room;
