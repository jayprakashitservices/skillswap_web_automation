import mongoose from "mongoose";
 
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected - db.js:6");
  } catch (err) {
    console.error("Database is not connected - db.js:8", err);
  }
};
 
export default connectDb;