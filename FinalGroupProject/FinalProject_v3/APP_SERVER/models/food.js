var mongoose = require('mongoose');

var ingredientsList = new mongoose.Schema({
    name : {type: String, required: [false, 'Ingredient name is required']},
    measurement: {type: Number, required: false},
    unit:{type:String}
});

var procedureSteps = new mongoose.Schema({
    step_no : {type: Number, required: true, },
    description: {type: String, required: [true, 'procedure step description required']},

});


var foodSchema = new mongoose.Schema({
    name : {type: String, required: true, minlength: 3},
    description: {type: String, required: true, maxlength:1000},
    url: {type: String, required: true},
    type: {type: String, enum:['Breakfast','Brunch','Lunch','Snacks','Dinner','Diet']},
    cuisine: { type : mongoose.Schema.Types.ObjectId, ref : 'Cuisine' },
    ingredients: [ingredientsList],    
    procedures: [procedureSteps]
});

mongoose.model('Food', foodSchema);

