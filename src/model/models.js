const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Policy Agents
const agents_schema = new mongoose.Schema({
    name: String
});
const Agents = mongoose.model('agents', agents_schema);

// User Accounts
const users_accounts_schema = new mongoose.Schema({
    account_name: String,
    account_type: String
})
const UserAccounts = mongoose.model('user_accounts', users_accounts_schema);

// Policy Users
const users_schema = new mongoose.Schema({
    first_name: String,
    dob: Date,
    address: String,
    phone_number: String,
    city: String,
    state: String,
    zip_code: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    gender: String,
    user_type: String,
    account_id: String
});
const Users = mongoose.model('users', users_schema);

// Policy Categories Schema
const policy_category_schema = new mongoose.Schema({
    category_name: String
});
const LOB = mongoose.model('policy_categories', policy_category_schema);

// Policy Carrier Schema
const policy_carrier_schema = new mongoose.Schema({
    company_name: String
});
const PolicyCarrier = mongoose.model('policy_carriers', policy_carrier_schema);

// Policy Information Schema
const policy_info_schema = new mongoose.Schema({
    policy_number: String,
    start_date: Date,
    end_date: Date,
    policy_mode: Number,
    producer: String,
    premium_amount: Number,
    policy_type: String,
    category_id: String,
    compony_id: String,
    user_id: String,
    agent_id: String
})
const PolicyData = mongoose.model('policy_datas', policy_info_schema);

// Policy Information Schema
const message_schema = new mongoose.Schema({
    message: String,
    inserted_timestamp: { type: Date, default: Date.now }
})
const Messages = mongoose.model('messages', message_schema);

module.exports = {
    Agents,
    Users,
    PolicyData,
    LOB,
    PolicyCarrier,
    UserAccounts,
    Messages
};