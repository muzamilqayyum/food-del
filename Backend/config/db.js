import mongoose from "mongoose";

const ch = "mongodb://127.0.0.1:27017/food-del";

const con = "mongodb+srv://MUZAMIL:11223344@cluster0.o4hzcxo.mongodb.net/?appName=foods-del"
export async function main() {
  try {
    await mongoose.connect(con);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}
