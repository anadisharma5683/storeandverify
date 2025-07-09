const ExcelJS = require('exceljs');
const fs = require('fs');

const filePath = './user_log.xlsx';

async function saveToExcel(email, username, status) {
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet('Log');
  } else {
    worksheet = workbook.addWorksheet('Log');
    worksheet.columns = [
      { header: 'Email', key: 'email' },
      { header: 'Username', key: 'username' },
      { header: 'Status', key: 'status' },
      { header: 'Timestamp', key: 'timestamp' },
    ];
  }

  worksheet.addRow({
    email,
    username,
    status,
    timestamp: new Date().toLocaleString()
  });

  await workbook.xlsx.writeFile(filePath);
}

module.exports = saveToExcel;
