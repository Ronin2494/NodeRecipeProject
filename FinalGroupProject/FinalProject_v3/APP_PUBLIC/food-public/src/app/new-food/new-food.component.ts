import { Component, OnInit, Input, Type } from '@angular/core';
import { Cuisine} from '../cuisine';
import { Food, ingredientsList, procedureSteps} from '../food';
import { FoodServiceService} from "../food-service.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css'],
  providers: [FoodServiceService]
})
export class NewFoodComponent implements OnInit {
  cuisine: Cuisine;

  constructor(private fb: FormBuilder,private foodService: FoodServiceService) { }
  foodForm: FormGroup;

  ngOnInit(): void {

    // code to get the cuisine details from cuisine collection in mongo DB
    this.foodService.getCuisine()
    .then((cuisine: Cuisine)=>{
      this.cuisine = cuisine;
      console.log(this.cuisine);  
  });


  this.foodForm = this.fb.group({
    name : "",
    description: "",
    url: "",
    type: "",
    cuisine: "",
    ingredients: this.fb.array([this.fb.group({
      name: "",
      measurement: 0,
      unit: ""
    })]),
    procedures: this.fb.array([this.fb.group({
      step_no: 1,
      description: "",
    })]),
  })
}

// get ingredients from foodform
get _ingredients() {
  return this.foodForm.get('ingredients') as FormArray;
}

// called when add ingredients button clicked
add_ingredients() {
  this._ingredients.push(this.fb.group({name:'', measurement: 0, unit: ""}));
}

// invoked on "remove" button click
delete_ingredients(index) {
  this._ingredients.removeAt(index);
}

// gets the procedures from foodform
get _procedures() {
  return this.foodForm.get('procedures') as FormArray;
}

// called when "add step" button is clicked 
add_procedures() {
  this._procedures.push(this.fb.group({step_no:null, description: ""}));
}

// called when "remove" button is clicked for procedure table
delete_procedures(index) {
  this._procedures.removeAt(index);
}


public createNewFood(): void{

  // forming the json to be passed as request
  var ing=[];

  for(var i =0; i< this.foodForm.value.ingredients.length; i++ ){
    ing.push({"name": this.foodForm.value.ingredients[i].name, "measurement": this.foodForm.value.ingredients[i].measurement, "unit": this.foodForm.value.ingredients[i].unit})   
  }

  var pro = [];

  for(var i =0; i< this.foodForm.value.procedures.length; i++ ){
    pro.push({"step_no": this.foodForm.value.procedures[i].step_no, "description": this.foodForm.value.procedures[i].description})   
  }
  
  var data: Food={
   "_id": "", 
  "name": this.foodForm.value.name,
  "type" : this.foodForm.value.type,
  "description" : this.foodForm.value.description,
  "cuisine":  this.foodForm.value.cuisine,
  "url" : this.foodForm.value.url,
  "ingredients": ing,
  "procedures": pro
  };

  // invoking the createfood methof in food service
  this.foodService.createFood(data);
  }

  isFieldValid(field: string) {
    return !this.foodForm.get(field).valid && this.foodForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
