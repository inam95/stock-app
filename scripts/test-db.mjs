import "dotenv/config";
import { connectDB } from "../src/database/mongoose.js";

async function main() {
  console.log("Testing database connection...");
  try {
    await connectDB();
    console.log("Database connected successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

main();
