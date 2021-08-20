import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptServiceService} from "./token-intercept-service.service";

//import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { HomeComponent } from './home/home.component';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';
import { NewFoodComponent } from './new-food/new-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ReviewComponent } from './review/review.component'
import {RatingModule} from 'primeng/rating';

@NgModule({
  declarations: [
    //AppComponent,
    FoodListComponent,
    HomeComponent,
    FrameworkComponent,
    AboutComponent,
    DetailsComponent,
    DeleteFoodComponent,

    NewFoodComponent,
    UpdateFoodComponent,
    LoginComponent,
    RegisterComponent,
    FieldErrorDisplayComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule,

    RouterModule.forRoot([
      {
      path: '', // the home page
      component : HomeComponent
      },
      {
        path: 'about', // display the about page
        component : AboutComponent
      },
      { 
      path: 'list', // displays the food list
      component : FoodListComponent,
      
    },
    {
      path: 'details/:_id', // for display details of a single food, _id is the mongoose object ID of the food document
      component : DetailsComponent,
    },
    {
      path: 'delete/:_id', // to delete a single food item, _id is the mongoose object ID of the food document
      component : DeleteFoodComponent,
    },
    {
      path: 'new', // to create a new food receipe
      component : NewFoodComponent,
    },
    {
      path: 'update/:_id', // to update a food recipe, _id is the mongoose object ID of the food document
      component : UpdateFoodComponent,
    },
    {
      path: 'login', // login user
      component : LoginComponent,
    },
    {
      path: 'register', // register user
      component : RegisterComponent,
    },
    {
      path: 'review/:_id', // to get a food recipe review, _id is the mongoose object ID of the food document
      component : ReviewComponent,
    },
    
  ])
  ],
  
  providers: [{provide:APP_BASE_HREF, useValue: '/'},
 {
   provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptServiceService,
   multi: true
 }
],
  bootstrap: [FrameworkComponent],

  
})
export class AppModule { }
