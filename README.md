# nodejs_assessment

1) Policies Search Based on Username
API Endpoint: /search_policies
Method: POST
Sample Request Payload: 
{
    "username":"Kristyn Raya",
    "search_type":"like" 
    // exact - search policies when policies username eauals to given username
    // like - search policies when policies matches with the given username partially
}
Sample Response: 
{
    "status": true,
    "message": "success",
    "data": [
        {
            "user_name": "Kristyn Raya",
            "userid": "67d388f9e2587b150a38fd69",
            "email": "hyper@mac.com",
            "phone_number": "4853784310",
            "city": "Winston Salem",
            "state": "NC",
            "gender": "Female",
            "policy": [
                {
                    "policy_number": "Z95WX65AGTIA",
                    "premium_amount": 1181,
                    "policy_type": "Single",
                    "policy_mode": 12,
                    "producer": "Aubrey Loder"
                }
            ]
        }
    ]
}

2) Policy Users Aggregation Data View
API Endpoint: /policies_aggregations
Method: GET
Sample Request:
NA - Request PayloadNot Required
Sample Response:
{
    "status": true,
    "message": "success",
    "data": [
        {
            "producer": "Matilde Ingraham",
            "policy_name": "Matilde Ingraham",
            "users_count": 24,
            "policy_user":[
                {
                    "user_id": "67d388f0e2587b150a38f938",
                    "user_name": "Tyra Lattea",
                    "email": "dkrishna@optonline.net",
                    "phone_number": "1827633013"
                },
                {
                    "user_id": "67d388f1e2587b150a38f967",
                    "user_name": "Sarita Bacon",
                    "email": "cgarcia@aol.com",
                    "phone_number": "(336) 408-3825"
                },
                {
                    "user_id": "67d388f2e2587b150a38f9d4",
                    "user_name": "Mary Joyner",
                    "email": "atmarks@comcast.net",
                    "phone_number": "(336) 768-1433"
                },
                {
                    "user_id": "67d388f2e2587b150a38fa09",
                    "user_name": "Diane Farris",
                    "email": "aprakash@verizon.net",
                    "phone_number": "(734) 320-0573"
                },
                {
                    "user_id": "67d388f3e2587b150a38fa6a",
                    "user_name": "Malvin Barnes",
                    "email": "mhassel@yahoo.ca",
                    "phone_number": "(336) 788-2533"
                },
                {
                    "user_id": "67d388f3e2587b150a38fa37",
                    "user_name": "Lorenzo Wesley",
                    "email": "madanm@gmail.com",
                    "phone_number": "(336) 749-7250"
                },
                {
                    "user_id": "67d388f3e2587b150a38fa93",
                    "user_name": "Cleo Willard-weems",
                    "email": "chrwin@msn.com",
                    "phone_number": "9668497097"
                },
                {
                    "user_id": "67d388f4e2587b150a38facd",
                    "user_name": "Derek Partin",
                    "email": "fwitness@aol.com",
                    "phone_number": "3158626586"
                },
                {
                    "user_id": "67d388f1e2587b150a38f994",
                    "user_name": "Georgette Golden",
                    "email": "singh@comcast.net",
                    "phone_number": "(336) 734-8889"
                },
                {
                    "user_id": "67d388f4e2587b150a38fb11",
                    "user_name": "Jerome Gathings",
                    "email": "stefano@msn.com",
                    "phone_number": "8860641623"
                },
                {
                    "user_id": "67d388f5e2587b150a38fb33",
                    "user_name": "James Kilby",
                    "email": "hamilton@verizon.net",
                    "phone_number": "4741484245"
                },
                {
                    "user_id": "67d388f5e2587b150a38fba3",
                    "user_name": "James Moose",
                    "email": "andersbr@mac.com",
                    "phone_number": "2281479283"
                },
                {
                    "user_id": "67d388f6e2587b150a38fbe8",
                    "user_name": "Penny Cox",
                    "email": "temmink@mac.com",
                    "phone_number": "4405278387"
                },
                {
                    "user_id": "67d388f6e2587b150a38fc04",
                    "user_name": "Shari Millsaps",
                    "email": "preneel@verizon.net",
                    "phone_number": "2842478801"
                },
                {
                    "user_id": "67d388f7e2587b150a38fc31",
                    "user_name": "Juliane Harari",
                    "email": "noneme@aol.com",
                    "phone_number": "9801528710"
                },
                {
                    "user_id": "67d388f7e2587b150a38fc8b",
                    "user_name": "Keturah Dagenais",
                    "email": "bancboy@att.net",
                    "phone_number": "2320732452"
                },
                {
                    "user_id": "67d388f5e2587b150a38fb7a",
                    "user_name": "Nancy Thomas",
                    "email": "clkao@yahoo.ca",
                    "phone_number": "9322534618"
                },
                {
                    "user_id": "67d388f7e2587b150a38fc7f",
                    "user_name": "Johana Lopiccolo",
                    "email": "earmstro@msn.com",
                    "phone_number": "5709523269"
                },
                {
                    "user_id": "67d388f8e2587b150a38fcb7",
                    "user_name": "Tomoko Mateo",
                    "email": "shawnce@msn.com",
                    "phone_number": "8227671396"
                },
                {
                    "user_id": "67d388f8e2587b150a38fd14",
                    "user_name": "Stephnie Cowboy",
                    "email": "johnh@optonline.net",
                    "phone_number": "3577958682"
                },
                {
                    "user_id": "67d388f9e2587b150a38fd27",
                    "user_name": "Jonnie Hermann",
                    "email": "granboul@optonline.net",
                    "phone_number": "5857231115"
                },
                {
                    "user_id": "67d388f9e2587b150a38fd75",
                    "user_name": "Shandra Brathwaite",
                    "email": "earmstro@att.net",
                    "phone_number": "7142771955"
                },
                {
                    "user_id": "67d388fae2587b150a38fdc9",
                    "user_name": "Olivia Flanary",
                    "email": "dgatwood@verizon.net",
                    "phone_number": "9704578212"
                },
                {
                    "user_id": "67d388f9e2587b150a38fd86",
                    "user_name": "Chad Crawley",
                    "email": "mmccool@icloud.com",
                    "phone_number": "3909225616"
                }
            ]
        }
    ]
}

3) API to insert given message into Database at given date and time
API Endpoint: /schedule_message
Method: POST
Sample Request Payload:
{
    "message":"Testing",
    "date_time":"15/03/2025 14:50:10"
}

Sample Response:
{
    "status": true,
    "message": "Message scheduled for insertion in DB"
}