import { google } from "googleapis";

const KEYFILE_PATH = "./trip-clone-a4a536ed6722.json";
const SPREADSHEET_ID ="1Waph6Dyrgx5mEPQJYVNkzcA9zmyiFs51Z0DDQXj1pE8";
const range = "Page1!A2";
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function getSheetNames() {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetNames = response.data.sheets.map(
      (sheet) => sheet.properties.title
    );
    const spreadsheetTitle = response.data.properties.title;
    console.log("Spreadsheet Title:", spreadsheetTitle);
    console.log("Sheet Names:", sheetNames);
  } catch (error) {
    console.error("The API returned an error: " + error);
  }
}

export async function updateSheetWithData(arr) {
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "Page1!A2:R",
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      resource: {
        values: arr,
      },
    });
  } catch (error) {
    console.error("Error updating Google Sheet:", error);
  }
}
