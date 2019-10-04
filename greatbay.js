var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_Password,
    database: "greatbayDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    bidPost()
})

//   Below - change football_teams --> actual DB name
function createItem(itemq, catagoryq, bidq) {
    connection.query("INSERT INTO items SET ?",
        {
            item: "",
            catagory: "",
            bid: ""
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows);
            console.log(res);
            //  updateProduct();
        });
}


//inquirer
var bidPost = function () {
    inquirer
        .prompt([{
            name: "bidorpost",
            type: "list",
            choices: ["I'd like to bid", "I'd like to post"],
            message: "Would You like to bid or post a bid?"
        }])
        .then(function (response) {
            
            if (response.bidorpost === "I'd like to bid"){
                bidAuction();
            }else{
                postAuction();
            }
        })
}

var bidAuction = function () {
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "what is the item you wish to bid on?"
        }, {
            name: "bid",
            type: "input",
            message: "What would you like to bid?"
        }])
        .then(function (response) {
            console.log(response)
            
        })
}

var postAuction = function () {
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "what is the item you wish to submit?"
        }, {
            name: "category",
            type: "input",
            message: "what category would you like to place it in?"
        }, {
            name: "startingBid",
            type: "input",
            message: "what would you like the starting bid to be?"
        }])
        .then(function (response) {
            console.log(response)
        })
}
