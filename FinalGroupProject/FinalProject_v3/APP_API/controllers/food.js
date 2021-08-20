const moongose = require('mongoose');
var fs = require('fs');

const Food = moongose.model("Food");
const Cuisine = moongose.model("Cuisine");
const Review = moongose.model("Review");

const getFoods = function (req, res){

    Food.aggregate([{
        $lookup: {
            from: "cuisine", // collection name in db
            localField: "cuisine",
            foreignField: "_id",
            as: "cuisine"
        }
    }]).exec(function(err, fooddata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(fooddata);
    });
  
};
const getCuisine = function (req, res){
    
    Cuisine.find().exec(function(err,cuisinedata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(cuisinedata);

    })
};

const getSingleFoodReviews = function(req,res){

    let id = req.params.foodid;
  
    Review.aggregate([
        {$match : {recipe : moongose.Types.ObjectId(id)}},
        ]).exec(function(err, fooddata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(fooddata);
    });


}

const AddFoodReview = function(req,res){
  
    if(!req.params.foodid){
        res
        .status(404)
        .json({"message": "not found, foodid is required"});
        return;
    }

    Review.create({
        reviewername :req.body.reviewername,
        reviewcomment: req.body.reviewcomment,
        rating:req.body.rating,
        recipe: moongose.Types.ObjectId(req.params.foodid),
        reviewdate:  Date.now(),
    }, 
    (err,foodData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(foodData);
        }
    })

}

const createFood = function (req, res){
    Food.create({
        name :req.body.name,
        description: req.body.description,
        url:req.body.url,
        type:req.body.type,
        cuisine: moongose.Types.ObjectId(req.body.cuisine),
        ingredients: req.body.ingredients,
        procedures: req.body.procedures     
    }, 
    (err,foodData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(foodData);
        }
    })
};

const getSingleFood = function (req, res){
    
    let id = req.params.foodid;
    Food.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}},
        {$lookup: {
            from: "cuisine", // collection name in db
            localField: "cuisine",
            foreignField: "_id",
            as: "cuisine"
        }
    }]).exec(function(err, fooddata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(fooddata);
    });

};

const updateFood = function (req, res){
    if(!req.params.foodid){
        res
        .status(404)
        .json({"message": "not found, foodid is required"});
        return;
    }
    Food.findById(req.params.foodid)
    .exec((err, fooddata) => {
        if(!fooddata){
            res
            .json(404)
            .status({"message": "foodid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        fooddata.name = req.body.name;
        fooddata.description = req.body.description;
        fooddata.url = req.body.url;
        fooddata.type=req.body.type;
        fooddata.cuisine=moongose.Types.ObjectId(req.body.cuisine);
        fooddata.ingredients = req.body.ingredients;
        fooddata.procedures = req.body.procedures; 
    
        fooddata.save((err,fooddata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(fooddata);
            }
        })
    })
};

const deleteFood = function (req, res){
const foodid = req.params.foodid;
    if(foodid){
        Food.findByIdAndRemove(foodid)
        .exec((err, fooddata) =>{
            if(err){
                res
                .status(404)
                .json(err);
                return;
            }
            res
            .status(204)
            .json(null);    
        })
    }
    else{
        res
        .status(404)
        .json({"message": "no foodId"});
    }
};

module.exports = {getFoods,createFood,getSingleFood,updateFood,deleteFood,getCuisine, getSingleFoodReviews,AddFoodReview};