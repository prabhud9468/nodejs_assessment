
const mongoose = require('mongoose');

// MongoDB Connection For Worker Thread
mongoose.connect(process.env.MONGO_URL + "/" + process.env.DATABASE).then(async () => {
    console.log('MongoDB connected successfully in Workers Thread!')
}).catch(err => {
    console.error('Worker MongoDB connection error:', err);
});

// Importing Database Models
const {
    Agents,
    Users,
    PolicyData,
    LOB,
    PolicyCarrier,
    UserAccounts
} = require("../model/models");

async function InsertOne(data, res) {
    return new Promise(async (resolve, reject) => {
        try {
            // Agents Data
            let agent_data = { name: data["agent"] };
            const agent_info = await Agents.findOneAndUpdate(agent_data,{$set:agent_data},{ upsert: true, new: true });

            // Account Information
            let account_data = {
                account_name: data["account_name"],
                account_type: data["account_type"]
            };
            const account_info = await UserAccounts.findOneAndUpdate(account_data,{$set:agent_data},{ upsert: true, new: true });

            // User Information
            let user_data = {
                first_name: data["firstname"],
                dob: new Date(data["dob"]),
                address: data["address"],
                phone_number: data["phone"],
                city: data["city"],
                state: data["state"],
                zip_code: data["zip"],
                email: data["email"],
                gender: data["gender"] === undefined ? null : data["gender"],
                user_type: data["userType"]
            };
            const user_info = await Users.findOneAndUpdate(user_data,{$set:user_data},{ upsert: true, new: true });

            // Catergor Information
            let category_data = { category_name: data["category_name"] };
            const category_info = await LOB.findOneAndUpdate(category_data,{$set:category_data},{ upsert: true, new: true });

            // Company Information
            let company_data = { company_name: data["company_name"] };
            const company_info = await PolicyCarrier.findOneAndUpdate(company_data,{$set:company_data},{ upsert: true, new: true });

            // Policy Information
            let policy_data = {
                policy_number: data["policy_number"],
                start_date: new Date(data["policy_start_date"]),
                end_date: new Date(data["policy_end_date"]),
                policy_mode: data["policy_mode"],
                producer: data["producer"],
                premium_amount: data["premium_amount"],
                policy_type: data["policy_type"],
                category_id: category_info["_id"],
                compony_id: company_info["_id"],
                user_id: user_info["_id"],
                agent_id: agent_info["_id"],
                account_id: account_info["_id"]
            };
            await PolicyData.insertOne(policy_data);
            resolve({ status: true, message: "Data uploaded successfully" });
        } catch (e) {
            reject({ status: false, message: e.message });
        }
    })
}
async function InsertData(uploaded_data, res) {
    return new Promise(async (resolve, reject) => {
        try {
            let Result = await Promise.all(
                uploaded_data.map(async function(data) {
                    return await InsertOne(data);
                })
            );
            resolve({ 
                status: 200, 
                message: "Data uploaded successfully", 
                uploaded_count: uploaded_data.length, 
                inserted_count:Result.reduce((acc,cur)=> cur.status ? acc+1 : acc, 0), 
                error_count:Result.reduce((acc,cur)=> cur.status===false ? acc+1 : acc, 0), 
            });
        } catch (e) {
            reject({ status: false, message: e.message });
        }
    })
}

module.exports = {
    InsertData,
    InsertOne
};