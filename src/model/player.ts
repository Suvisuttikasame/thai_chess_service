import mongoose, { Schema } from "mongoose";

export enum Side {
  WHITE = "white",
  BLACK = "black",
}

export const playerSchema = new Schema({
  playerId: { type: String, required: true },
  side: { type: String, enum: [Side.BLACK, Side.WHITE], required: true },
  point: { type: Number, max: 10, default: 0 },
});

const Player = mongoose.model("player", playerSchema);

export default Player;
