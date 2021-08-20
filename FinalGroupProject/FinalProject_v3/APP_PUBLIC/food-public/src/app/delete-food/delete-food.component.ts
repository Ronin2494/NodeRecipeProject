import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Food} from '../food';
import { FoodServiceService} from "../food-service.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-delete-food',
  templateUrl: './delete-food.component.html',
  styleUrls: ['./delete-food.component.css'],
  providers: [FoodServiceService]
})
export class DeleteFoodComponent implements OnInit {

  constructor( 
    private foodDataService: FoodServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) =>{      
        return this.foodDataService.deleteFood(params['_id'])
      })
    ).subscribe((response) => {
      //console.log(response);
    });
  }

}
