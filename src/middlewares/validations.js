const multer = require('multer');
const path = require('path');
const moment = require("moment-timezone");
const { check, validationResult } = require("express-validator");

// Validation constraints for search policies based on username
const PolyciesSearch = [
    check("username", "username is required").not().isEmpty(),
    check("search_type", "image is required").not().isEmpty().custom((value) => {
        if (value === "exact" || value === "like") {
            return true;
        } else {
            throw new Error('search_type should be (extact/like)');
        }
    }),
];
// Validation constraints for scheduled message request payload
const ScheduleMessagePayloadCheck = [
    check("message", "message is required").not().isEmpty(),
    check("date_time", "date_time is required").not().isEmpty().custom((value) => {
        let date_time = moment(value,"DD/MM/YYYY hh:mm:ss").toDate();
        if(date_time.toString()==="Invalid Date"){
            throw new Error('date_time format should be (DD/MM/YYYY hh:mm:ss) 24 hours format');
        }else{
            return true;
        }
    }),
]
// Validating API request payload
function ValidateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    } else {
        next();
    }
}
// Uploaded file type validation
function ValidateUploadFile(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ errors: [{ msg: 'Please Upload XLSX/CSV Data File. Allowed Max size is 1MB' }] });
    } else {
        next();
    }
}
// Files storage configuration
const storage = multer.diskStorage({
    destination: './public/uploads/', // Folder to store uploaded files
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
// Initialize multer with storage settings
const UploadingFile = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 5 MB file limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /xlsx|csv|sheet/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        return cb(null, extName && mimeType)
    }
});

module.exports = {
    ValidateRequest,
    ValidateUploadFile,
    UploadingFile,
    PolyciesSearch,
    ScheduleMessagePayloadCheck
}