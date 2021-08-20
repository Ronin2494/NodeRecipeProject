var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewername:{type:String, required:true},
    reviewcomment:{type:String, required:true, minlength:10, maxlength:500},
    rating :{type:Number, required: true},
    recipe: { type : mongoose.Schema.Types.ObjectId, ref : 'Food'},
    reviewdate : {type:Date}
});


var Review = mongoose.model('Review', reviewSchema, 'review');
module.exports = Review;