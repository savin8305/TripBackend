import express from "express";
import cors from "cors";
import { config } from "dotenv"; // Import dotenv and call config
import { setupRoutes } from "./routes.js";
import { Data, connectToDatabase } from "./db.js";
import DataformatingforSheet from "./controllers/tripController.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
config();

const app = express();
app.use(express.json());
app.use(cors());
connectToDatabase()
setupRoutes(app);
console.log("process.env.MONGO_URI",process.env.MONGO_URI);
console.log("SPREADSHEET_ID",process.env.SPREADSHEET_ID);
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.delete("/deletedata/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id for deletion", id);

  try {
    let result = await Data.findOneAndUpdate(
      { "Data._id": id },
      { $set: { "Data.$.isDelete": true } }
    );
    console.log(result);
    res.status(200).send({ message: "Document deleted successfully" });
    DataformatingforSheet();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting document" });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const existingDocument = await Data.findOne({ "Data._id": id });
    if (!existingDocument) {
      console.log("Document not found for ID:", id);
      return res.status(404).json({ error: "Document not found" });
    }

    const dataIndex = existingDocument.Data.findIndex(
      (item) => item._id.toString() === id
    );
    if (dataIndex === -1) {
      console.log("Data not found for ID:", id);
      return res.status(404).json({ error: "Data not found" });
    }

    const updatedData = {
      ...existingDocument.Data[dataIndex],
      ...newData,
      Date: existingDocument.Data[dataIndex].Date,
      Day: existingDocument.Data[dataIndex].Day,
      SRNumber: existingDocument.Data[dataIndex].SRNumber || 2,
    };

    existingDocument.Data[dataIndex] = updatedData;
    DataformatingforSheet();
    const updatedDocument = await existingDocument.save();
    console.log("Updated document:", updatedDocument);

    return res.json(updatedDocument);
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
const EmployeeSchema = new mongoose.Schema({
  PlanId: { type: String, required: true },
  EmployeeId: { type: [String], required: true },
  EmployeeName: { type: [String], required: true }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

const Empid = [
  { title: "67890", name: "Gopal" },
  { title: "98765", name: "Parvati" },
  { title: "45678", name: "Shiva" },
  { title: "87654", name: "Vishnu" },
  { title: "23456", name: "Lakshmi" },
];

app.post('/api/employee', async (req, res) => {
  try {
    const PlanId = 'RCka'; 
    const EmployeeId = Empid.map(emp => emp.title);
    const EmployeeName = Empid.map(emp => emp.name);

    const newEmployee = new Employee({
      PlanId,
      EmployeeId,
      EmployeeName
    });

    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/employee', async (req, res) => {
  try {
    const employees = await Employee.find({}, 'EmployeeId EmployeeName -_id');

    if (!employees) {
      return res.status(404).json({ message: 'No employees found' });
    }

    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
