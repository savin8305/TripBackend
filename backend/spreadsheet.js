import { google } from "googleapis";
import auth from "./auth.js"; 
const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = "1Waph6Dyrgx5mEPQJYVNkzcA9zmyiFs51Z0DDQXj1pE8";
const range = "Page1!A2";
export async function updateSpreadsheet(data) {
  try {
    const values = prepareValues(data);
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "Page1!A2:R",
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      resource: { values },
    });
  } catch (error) {
    throw error;
  }
}

function prepareValues(data) {
  return data.map((entry) => [
    entry.EntryDateAndTime,
    entry.PlanId,
    1,
    Array.isArray(entry.EmployeeId) ? entry.EmployeeId.join(", ") : "",
    Array.isArray(entry.EmployeeName) ? entry.EmployeeName.join(", ") : "",
    entry.Type,
    entry.Department,
    entry.SRNumber,
    entry.Data.length,
    1,
    entry.Data.map((d) => [
      d.Date,
      d.Day,
      d.Country,
      d.State,
      d.City,
      d.ClientName,
      d.Purpose,
      d.Remarks,
    ]),
  ]);
}
