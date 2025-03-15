const schedule = require('node-schedule');
const moment = require("moment-timezone");
const { Worker } = require('worker_threads');

// Uploading from file with worker threads
async function UploadDataFile(req, res) {
    try {
        const worker = new Worker('./src/controler/worker_thread.js', {
            workerData: { filePath: req.file.path },
        });
        worker.on('message', (response) => {
            res.status(200).send(response);
        });
        worker.on('error', (error) => {
            console.error('Worker Error:', error);
            res.status(500).send({ status: false, message: error.message });
        });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
}

// Search Policies based on given username
async function SearchUserPolycies(req, res) {
    try {
        const {
            username,
            search_type // "exact/like"
        } = req.body;
        let data = await Users.aggregate([
            {
                "$match": search_type === "exact" ? {
                    "first_name": username
                } : {
                    "first_name": { "$regex": username }
                }
            },
            {
                "$addFields": {
                    "userId": { "$toString": "$_id" }
                }
            },
            {
                $lookup: {
                    from: "policy_datas",
                    localField: "userId",
                    foreignField: "user_id",
                    as: "user_policies"
                }
            },
            {
                $project: {
                    "_id": 0,
                    user_name: "$first_name",
                    userid: "$userId",
                    email: "$email",
                    phone_number: "$phone_number",
                    city: "$city",
                    state: "$state",
                    gender: "$gender",
                    policy: [{
                        policy_number: { $first: "$user_policies.policy_number" },
                        premium_amount: { $first: "$user_policies.premium_amount" },
                        policy_type: { $first: "$user_policies.policy_type" },
                        policy_mode: { $first: "$user_policies.policy_mode" },
                        producer: { $first: "$user_policies.producer" }
                    }]
                }
            }
        ]);
        res.send({ status: true, message: "success", data });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
}

// Policies aggregation data view
async function AggregateUserPolicies(req, res) {
    try {
        let data = await PolicyData.aggregate([
            {
                "$addFields": {
                    "userId": { 
                        "$toObjectId": "$user_id" 
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo',
                }
            },
            {
                $unwind: '$userInfo'
            },
            {
                $group: {
                    _id: "$producer",
                    users_list: { 
                        $push: { 
                            user_id: "$userId",
                            user_name: "$userInfo.first_name",
                            email: "$userInfo.email",
                            phone_number: "$userInfo.phone_number", 
                        } 
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    "_id": 0,
                    producer: "$_id",
                    policy_name: "$_id",
                    users_count: "$count",
                    policy_user: "$users_list"
                }
            }
        ]);
        res.send({ status: true, message: "success", data });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
}

// Scheduling message to insert into DB at given timestamp
async function ScheduleMessage(req, res) {
    try{
        const { message, date_time } = req.body;
        let ScheduleTime = moment(date_time,"DD/MM/YYYY hh:mm:ss").toDate();
        schedule.scheduleJob(ScheduleTime, async () => {
            try{
                await MessagesCollecion.insertOne({message:message});
                console.log("Message Inserted Successfully!");
            }catch(e){
                console.log(e.message);
            }
        });
        res.status(200).send({status:true, message:"Message scheduled for insertion in DB"})
    }catch (e) {
        res.status(500).send({status:false, message:e.message});
    }
}

module.exports = {
    UploadDataFile,
    SearchUserPolycies,
    AggregateUserPolicies,
    ScheduleMessage
};