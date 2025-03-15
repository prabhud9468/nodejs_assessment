var express = require('express');
var router = express.Router();

// Imported Validation middlewares for request payload validations for both file upload and request body content
const {
  ValidateRequest, 
  ValidateUploadFile,
  UploadingFile,
  PolyciesSearch,
  ScheduleMessagePayloadCheck
} = require("../src/middlewares/validations");

// Imported Controller Functions to UploadFile, search policies based on username and policy users aggregations data view
const { 
  UploadDataFile,
  SearchUserPolycies,
  AggregateUserPolicies,
  ScheduleMessage
} = require("../src/controler/controler");


// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ISUREDMINE Assessment' });
});

/// Upload data(csv/xlsx) file
router.post('/upload', UploadingFile.single('data_file'), ValidateUploadFile, UploadDataFile);

// Policies search based on username
router.post('/search_policies', PolyciesSearch, ValidateRequest, SearchUserPolycies);

// Policy users aggregations data view
router.get('/policies_aggregations', AggregateUserPolicies);

// Scheduling Message to Insert in DB
router.post('/schedule_message', ScheduleMessagePayloadCheck, ValidateRequest, ScheduleMessage);

// Invalid API's Endpoints route
router.all('/*', async function(req, res, next) {
  res.status(404).send({status:false, message:"Invalid API Endpoint"})
});

module.exports = router;
