import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Food} from '../food';
import { FoodServiceService} from "../food-service.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [FoodServiceService]
})

export class DetailsComponent implements OnInit {

  newFood: Food;
  private tokenavailable = true;
  
  constructor( 
    private foodDataService: FoodServiceService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) =>{      
        return this.foodDataService.getSingleFood(params['_id'])
      })
    ).subscribe((newfood: Food) =>{
      this.newFood = newfood;
      var x = sessionStorage.getItem("usertoken");
     if (x == null || x == undefined){
      this.tokenavailable = false;
     }
      //console.log(newfood);
    })
  }

}
