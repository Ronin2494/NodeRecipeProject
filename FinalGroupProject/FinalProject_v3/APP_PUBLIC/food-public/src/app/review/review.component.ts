import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Review} from '../food';
import { FoodServiceService} from "../food-service.service";
import { switchMap } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  providers: [FoodServiceService]
})
export class ReviewComponent implements OnInit {

  reviews: Review[];
  foodid: string;
 
  public reviewdata: Review = {
    _id:'',
    reviewername: '',
    reviewcomment: '',
    reviewdate : null,
    recipe : this.foodid,
    rating : null
  };

  form: FormGroup;


  constructor(private foodDataService: FoodServiceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }

ngOnInit(): void {

  this.form = this.formBuilder.group({
        reviewername: [null, Validators.required],
    reviewcomment: [null, Validators.required],
    rating : [null, Validators.required],
  });
  

    this.route.params.pipe(switchMap((params: Params) =>{   
      this.foodid = params['_id'];   
      return this.foodDataService.getFoodReviews(params['_id'])
    })
  ).subscribe((reviews: Review[]) =>{
    this.reviews = reviews.map(review =>
      {
      return review;
    });
    console.log(reviews);
  })
  }

  public reviewrecipe(reviewdata: Review): void{

    if (this.form.valid) {
      console.log('form submitted');
    } else {
      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);            
        control.markAsTouched({ onlySelf: true });      
      });
    }

    console.log(this.reviewdata);
    this.foodDataService.createFoodReview(this.reviewdata, this.foodid);

  }
counter(i: number) {
    return new Array(i);
}

isFieldValid(field: string) {
  return !this.form.get(field).valid && this.form.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}

}
