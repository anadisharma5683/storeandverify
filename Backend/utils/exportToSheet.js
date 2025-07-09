const { google } = require('googleapis');
const User = require('../models/User');
const credentials = require('../google-credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = '1sDu6bBWDpbJNxOmgo8CE8z-a4C9btLEoD3JJP8l-7V4';


const exportUsersToSheet = async () => {
  const users = await User.find().lean();

  const values = [
    ['Email', 'Username', 'Password'], // headers
    ...users.map((u) => [u.email, u.username, u.password]),
  ];

  const resource = {
    values,
  };

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    resource,
  });

  return 'Users exported successfully to Google Sheet';
};

module.exports = exportUsersToSheet;
