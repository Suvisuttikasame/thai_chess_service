import { init } from "./socketio";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://root:root@localhost:27017/", {
    dbName: "thai_chess",
  })
  .then(() => {
    const io = init();
    io.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
