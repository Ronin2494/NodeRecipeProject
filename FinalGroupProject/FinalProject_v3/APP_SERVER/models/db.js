var mongoose = require("mongoose");
var mdl = require('./food');
var mdl1 = require('./cuisine');
var mdl2 = require('./review');

var dburi = "mongodb+srv://sphilip5993:swetha@cluster0-vcoij.mongodb.net/foodDB?retryWrites=true&w=majority";

mongoose.connect(dburi, {dbName:"foodDB"})

mongoose.connection.on("connected", function(){
    console.log("connected");      
});

mongoose.connection.on("error", function(){
    console.log("error");
});

mongoose.connection.on("disconnected", function(){
    console.log("disconnected");
});

