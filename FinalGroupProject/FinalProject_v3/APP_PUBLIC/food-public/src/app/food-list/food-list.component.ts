import { Component, OnInit } from '@angular/core';
import { Food} from '../food';
import { FoodServiceService} from "../food-service.service";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers: [FoodServiceService]
})

export class FoodListComponent implements OnInit {
  foods: Food[];
  

  constructor(private foodService: FoodServiceService) { }

  ngOnInit(): void {
    this.foodService.getFoods()
    .then((foods: Food[])=>{this.foods = foods.map(food =>{
      return food;
    });
  });
}

}
