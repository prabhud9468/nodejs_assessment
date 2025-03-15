const { parentPort, workerData } = require('worker_threads');
const XLSX = require('xlsx');
const { InsertData } = require("../db_operations/database");

// Processing file Data
async function processFile() {
    const workbook = XLSX.readFile(workerData.filePath);
    const sheetName = workbook.SheetNames[0];
    const uploaded_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    let processed_data_status = await InsertData(uploaded_data);
    parentPort.postMessage(processed_data_status);
}

processFile().catch((error) => {
    console.error('Worker Error:', error);
    parentPort.postMessage({ status: false, message: error.message });
});