var mongoose = require('mongoose');

// Cuisine names are stored in another collection in mongoDB, Thus we need the objectID in foodSchema.
var cuisineSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:3}
});


var Cuisine = mongoose.model('Cuisine', cuisineSchema, 'cuisine');
module.exports = Cuisine;
