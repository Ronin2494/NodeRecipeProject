var request  = require('request');

var apiOptions = {
    server: 'http://localhost:3000/'
}
const _renderListDisplay = function(req,res, responseBody){
    res.render('list-display', {foods:responseBody});
}

const listDisplay = function(req, res){
    const path = 'api/foods';
    const requestOptions = {
        url : apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,(err,response, body) =>{
          
            _renderListDisplay(req, res, body);
        }
    );
};

const _renderDisplay = function(req,res, responseBody){

    res.render('details', {foods:responseBody});
}

const details = function(req, res){
    
    const path = `api/foods/${req.params.foodid}`;
    
    const requestOptions = {
        url : apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,(err,response, body) =>{
            
            _renderDisplay(req, res, body);
        }
    );
};

const _renderCreatePage = function(req,res,responseBody ){
    res.render('create', {title: "Create New Food", data:responseBody});
}

const addNewFood = function(req,res){
    const path = 'api/cuisine';
    const requestOptions = {
        url : apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,(err,response, body) =>{
            _renderCreatePage(req, res, body);
        }
    );
}

const create = function(req, res){
    const path = 'api/foods/'; 
    
    var ingredient_name =[];
    var measurement= [];
    var unit= [];

    var step_no =[];
    var procedure_description= [];

    var ingredient_list = [];
    var procedure_list = [];

    for (const property in req.body) {
        
            if(`${property}`.includes("ingredient_name")){
                ingredient_name.push(`${req.body[property]}`)
            }
            if(`${property}`.includes("measurement")){
                measurement.push(`${req.body[property]}`)
            }
            if(`${property}`.includes("unit")){
                unit.push(`${req.body[property]}`)
            }
            if(`${property}`.includes("step_no")){
                step_no.push(`${req.body[property]}`)
            }
            if(`${property}`.includes("procedure_description")){
                procedure_description.push(`${req.body[property]}`)
            }
      }
     
    var ing_count = ingredient_name.length;
     
     for(i=0; i<ing_count; i++){
        ingredient_list.push({"name": ingredient_name[i], "measurement": measurement[i], "unit": unit[i]})
     }
     
     var pro_count = procedure_description.length;
     
     for(j=0; j<pro_count; j++){
        procedure_list.push({"step_no": step_no[j], "description": procedure_description[j]})
     }

    const postdata = {       
        name: req.body.name,
        description : req.body.description,
        url : req.body.url,
        type: req.body.type,
        cuisine: req.body.cuisine, 
    }
    postdata.ingredients = ingredient_list;
    postdata.procedures = procedure_list;

    const requestOptions = {
        url : apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,(err,response, body) =>{
            if(response.statusCode === 201){
                res.redirect('/list');
            }
        }
    );
};


const display = function (req, res){
    res.render('display', {message:"NOT IMPLEMENTED"});
};

module.exports = {listDisplay,details,display,create,addNewFood};