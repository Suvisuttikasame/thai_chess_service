import mongoose, { Schema } from "mongoose";
import { Side, playerSchema } from "./player";

export enum RoomType {
  FIND_OPP = "find-opponent",
  FRIEND_PL = "friend-play",
}

export enum RoomStatus {
  EMPTY = "empty",
  FULL = "full",
  CANCEL = "cancel",
}

export const initBoard: {
  id: Number;
  pieceName: String;
  position: Number;
  side: String;
}[] = [
  {
    id: 1,
    pieceName: "rook",
    position: 0,
    side: Side.WHITE,
  },
  {
    id: 2,
    pieceName: "knight",
    position: 1,
    side: Side.WHITE,
  },
  {
    id: 3,
    pieceName: "bishop",
    position: 2,
    side: Side.WHITE,
  },
  {
    id: 4,
    pieceName: "king",
    position: 3,
    side: Side.WHITE,
  },
  {
    id: 5,
    pieceName: "queen",
    position: 4,
    side: Side.WHITE,
  },
  {
    id: 6,
    pieceName: "bishop",
    position: 5,
    side: Side.WHITE,
  },
  {
    id: 7,
    pieceName: "knight",
    position: 6,
    side: Side.WHITE,
  },
  {
    id: 8,
    pieceName: "rook",
    position: 7,
    side: Side.WHITE,
  },
  {
    id: 9,
    pieceName: "pawn",
    position: 16,
    side: Side.WHITE,
  },
  {
    id: 10,
    pieceName: "pawn",
    position: 17,
    side: Side.WHITE,
  },
  {
    id: 11,
    pieceName: "pawn",
    position: 18,
    side: Side.WHITE,
  },
  {
    id: 12,
    pieceName: "pawn",
    position: 19,
    side: Side.WHITE,
  },
  {
    id: 13,
    pieceName: "pawn",
    position: 20,
    side: Side.WHITE,
  },
  {
    id: 14,
    pieceName: "pawn",
    position: 21,
    side: Side.WHITE,
  },
  {
    id: 15,
    pieceName: "pawn",
    position: 22,
    side: Side.WHITE,
  },
  {
    id: 16,
    pieceName: "pawn",
    position: 23,
    side: Side.WHITE,
  },
  {
    id: 17,
    pieceName: "pawn",
    position: 40,
    side: Side.BLACK,
  },
  {
    id: 18,
    pieceName: "pawn",
    position: 41,
    side: Side.BLACK,
  },
  {
    id: 19,
    pieceName: "pawn",
    position: 42,
    side: Side.BLACK,
  },
  {
    id: 20,
    pieceName: "pawn",
    position: 43,
    side: Side.BLACK,
  },
  {
    id: 21,
    pieceName: "pawn",
    position: 44,
    side: Side.BLACK,
  },
  {
    id: 22,
    pieceName: "pawn",
    position: 45,
    side: Side.BLACK,
  },
  {
    id: 23,
    pieceName: "pawn",
    position: 46,
    side: Side.BLACK,
  },
  {
    id: 24,
    pieceName: "pawn",
    position: 47,
    side: Side.BLACK,
  },
  {
    id: 25,
    pieceName: "rook",
    position: 56,
    side: Side.BLACK,
  },
  {
    id: 26,
    pieceName: "knight",
    position: 57,
    side: Side.BLACK,
  },
  {
    id: 27,
    pieceName: "bishop",
    position: 58,
    side: Side.BLACK,
  },
  {
    id: 28,
    pieceName: "queen",
    position: 59,
    side: Side.BLACK,
  },
  {
    id: 29,
    pieceName: "king",
    position: 60,
    side: Side.BLACK,
  },
  {
    id: 30,
    pieceName: "bishop",
    position: 61,
    side: Side.BLACK,
  },
  {
    id: 31,
    pieceName: "knight",
    position: 62,
    side: Side.BLACK,
  },
  {
    id: 32,
    pieceName: "rook",
    position: 63,
    side: Side.BLACK,
  },
];

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
    type: [{ id: Number, pieceName: String, position: Number, side: String }],
    required: true,
  },
});

const Room = mongoose.model("room", roomSchema);
export default Room;
