import { Component, OnInit, Input } from '@angular/core';
import { Cuisine} from '../cuisine';
import { ActivatedRoute, Params} from '@angular/router'
import { Food, ingredientsList, procedureSteps} from '../food';
import { FoodServiceService} from "../food-service.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css'],
  providers: [FoodServiceService]
})
export class UpdateFoodComponent implements OnInit {

  cuisine_data: Cuisine;
  foodDetails: Food;

  foodid: string;

  constructor(private fb: FormBuilder,private foodService: FoodServiceService, private route: ActivatedRoute) { }
  foodForm: FormGroup;

  ngOnInit(): void {

    this.foodForm = this.fb.group({
      name : "",
      description: "",
      url: "",
      type: "",
      cuisine: "",
      ingredients: this.fb.array([this.fb.group({
        name: "",
        measurement: null,
        unit: ""
      })]),
      procedures: this.fb.array([this.fb.group({
        step_no: 1,
        description: "",
      })]),
    });

    // code to get the cuisine details from cuisine collection in mongo DB
     this.foodService.getCuisine()
     .then((cuisine_data: Cuisine)=>{
       this.cuisine_data = cuisine_data;

   });

  this.route.params.pipe(switchMap((params: Params) =>{     
    this.foodid = params['_id'];
    return this.foodService.getSingleFood(params['_id']) // get the details of the selected food
  })
).subscribe((foodDetails: Food) =>{
  this.foodDetails = foodDetails;
  
  // code to bind existing ingredients to the form table
  for(var i=0; i< this.foodDetails[0].ingredients.length; i++){
    this.add_ingredients1(this.foodDetails[0].ingredients, i);
  }

  // code to bind existing procedures to the form table
  for(var i=0; i< this.foodDetails[0].procedures.length; i++){
  this.add_procedures1(this.foodDetails[0].procedures, i);
  }
  
  // workaround
  this.delete_ingredients(0); // remove extra first row
  this.delete_procedures(0); // remove extra first row
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

// called on page load inside subscribe function to bind existing ingredients to the json and html
add_ingredients1(data,position) {
  
  this._ingredients.push(this.fb.group({name:data[position].name, measurement: data[position].measurement, unit: data[position].unit}));
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

// called on page load inside subscribe function to bind existing procedures to the json and html
add_procedures1(data,position) {
  this._procedures.push(this.fb.group({step_no:data[position].step_no, description: data[position].description}));
}

// called when "remove" button is clicked for procedure table
delete_procedures(index) {
  this._procedures.removeAt(index);
}


// called on the submit event of the form
public updateFood(): void{

  // to form the json request with ingredients and procedures subdocument
  var ing=[];

  for(var i =0; i< this.foodForm.value.ingredients.length; i++ ){
    ing.push({"name": this.foodForm.value.ingredients[i].name, "measurement": this.foodForm.value.ingredients[i].measurement, "unit": this.foodForm.value.ingredients[i].unit})   
  }

  var pro = [];

  for(var i =0; i< this.foodForm.value.procedures.length; i++ ){
    pro.push({"step_no": this.foodForm.value.procedures[i].step_no, "description": this.foodForm.value.procedures[i].description})   
  }
  
  var data: Food={
   "_id": this.foodForm.value._id, 
  "name": this.foodForm.value.name,
  "type" : this.foodForm.value.type,
  "description" : this.foodForm.value.description,
  "cuisine":  this.foodForm.value.cuisine,
  "url" : this.foodForm.value.url,
  "ingredients": ing,
  "procedures": pro
  };

  // invoking the updatefood methof from food service
  this.foodService.updateFood(data, this.foodid);
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
