import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.log("=> no database uri provided");
    return;
  }

  try {
    console.log("=> using new database connection");
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> database connection successful");
  } catch (error: any) {
    console.log("=> error while connecting with database: ", error.message);
  }
};
