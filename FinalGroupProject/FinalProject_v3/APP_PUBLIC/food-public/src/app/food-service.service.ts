import { Injectable } from '@angular/core';
import { Food, UserRegister} from './food';
import {Cuisine} from './cuisine'
import { UserLogin, UserToken, Review} from './food';
import { HttpClient, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FoodServiceService {

  private foodsUrl  = 'http://localhost:3000/api/foods'; // for food collection
  private foodsUrlCuisine  = 'http://localhost:3000/api/cuisine'; // for cuisine collection
  private foodsUrlReview  = 'http://localhost:3000/api/reviews'; // for cuisine collection
  private userLoginUrl  = 'http://localhost:4000/user/login'; 
  private userRegisterUrl  = 'http://localhost:4000/user/signup'; 
  constructor(private http:HttpClient) {  }

  

  // to get the food list
  getFoods() : Promise<void | Food[]>
  {
    return this.http.get(this.foodsUrl).toPromise()
    .then(response => response as Food[]).catch(this.handleError);
  }

  // to get the food reviews
  getFoodReviews(foodId: string) : Promise<void | Review[]>
  {
    return this.http.get(this.foodsUrlReview + '/' + foodId).toPromise()
    .then(response => response as Review[]).catch(this.handleError);
  }

  // to get the food reviews
  createFoodReview(review: Review, foodId: string) : Promise<void | Review>
  {
    return this.http.post(this.foodsUrlReview + '/' + foodId, review)
    .toPromise().then(response => {window.location.href = "/list"})
    .catch(this.handleError);
  }

  // to get the details of a single food
  getSingleFood(foodId: string): Promise<void | Food>
  {
    return this.http.get(this.foodsUrl + '/' + foodId).toPromise()
    .then(response => response as Food).catch(this.handleError);
  }

  // to delete a food
  deleteFood(foodId: string): Promise<void>
  {
    var input = confirm("Please press OK to confirm DELETION."); // take confirmation on deletion from user;
    if(input == true){
    return this.http.delete(this.foodsUrl + '/' + foodId).toPromise()
    .then(response => {window.location.href = "/list"}).catch(this.handleError);
    }
    else{
      window.history.go(-1); // go back to the recipe details page
    }
  }

  // get the cuisines 
  getCuisine(): Promise<void | Cuisine>{
    return this.http.get(this.foodsUrlCuisine).toPromise()
    .then(response => response as Cuisine).catch(this.handleError);
  }

  // POST operation to create a food
  createFood(newfood: Food): Promise<void | Food>{
  
    return this.http.post(this.foodsUrl, newfood)
    .toPromise().then(response => {window.location.href = "/list"})
    .catch(this.handleError);
  }

  // PUT operation to update an existing food
  updateFood(newfood: Food, foodId: string): Promise<void | Food>{

    return this.http.put(this.foodsUrl + '/' + foodId, newfood)
    .toPromise().then(response => {window.location.href = "/list"})
    .catch(this.handleError);
  }
  
  tokendata: UserToken;

  userLogin(logindata: UserLogin): Promise<void | UserToken>{

    return this.http.post(this.userLoginUrl, logindata)
    .toPromise()
    .then((response: UserToken)=>{
      console.log(response);
      this.tokendata = response;
      sessionStorage.setItem('attempt', "3");
      sessionStorage.setItem('usertoken', this.tokendata.token);
      console.log(this.tokendata.token);
      window.location.href = "/list";
  })
    .catch(this.error_login);
  }

  userRegister(registerdata: UserRegister): Promise<void | UserToken>{

    return this.http.post(this.userRegisterUrl, registerdata)
    .toPromise()
    .then((response: JSON)=>{
      //this.tokendata = response;
      
      sessionStorage.setItem('attempt', "3");
      window.location.href = "/login";
  })
    .catch(this.handleError);
  }
  
  private handleError(error: any)
    {
      console.log("into error");
      if(error.error.msg == "User Already Exists"){
        alert("User Already Exists");
        window.location.href = "/register"
      }
     
  }
  private error_login(error: any)
    {
    var y = sessionStorage.getItem("attempt")
  
    if(parseInt(y)  < 3 && parseInt(y) >0){
      alert(y + " Attemps left!")
      return;
    }
    else{
      window.location.href = "/register"
    }
    
      console.log(error);
      //window.location.href = "/register"
  }
}
