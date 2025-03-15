const mongoose = require('mongoose')
const models = require("../model/models");
mongoose.connect(process.env.MONGO_URL + "/" + process.env.DATABASE).then(async () => {
    console.log('MongoDB connected successfully!')
    Agents=models.Agents;
    Users=models.Users;
    PolicyData=models.PolicyData;
    LOB=models.LOB;
    PolicyCarrier=models.PolicyCarrier;
    UserAccounts=models.UserAccounts;
    MessagesCollecion=models.Messages;
    console.log('Models initialized successfully!')
}).catch(err => {
    console.error('MongoDB connection error:', err);
    // Exit process with failure with mongo database connection
    process.exit(1);
});

