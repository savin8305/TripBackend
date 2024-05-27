import mongoose from "mongoose";
import { nanoid } from "nanoid";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Handle error appropriately, e.g., exit the process
    process.exit(1);
  }
}

const dataSchema = mongoose.Schema({
  PlanId: {
    type: String,
    required: true,
    default: () => nanoid(4),
    index: { unique: true },
  },
  EmployeeId: [String],
  EmployeeName: [String],
  Type: String,
  Department: String,
  SRNumber: Number,
  Data: [{
    uniqueId: {
      type: String,
      required: true,
      default: () => nanoid(7),
      index: { unique: true },
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    Date: String,
    Day: Number,
    Country: String,
    State: String,
    City: String,
    ClientName: String,
    Purpose: String,
    Remarks: String,
  }],
});


export const Data = mongoose.model("Data", dataSchema);

