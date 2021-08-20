import {Component, OnInit} from '@angular/core';

export class Food {
    _id : string;
    name : string;
    description: string;
    url: string;
    type: string;
    cuisine: string;
    ingredients: ingredientsList[];    
    procedures: procedureSteps[];
}

export class ingredientsList {
    name : string;
    measurement: number
    unit:string
};

export class procedureSteps{
    step_no : number;
    description: string;

};

export class UserLogin {
    _id : string;
    email: string;
    password: string;
}
export class UserRegister {
    _id : string;
    username : string;
    email: string;
    password: string;
}

export class UserToken {
    token : string;
}

export class Review {
    _id : string;
    reviewername: String;
    reviewcomment: String;
    recipe : String;
    rating : Number;
    reviewdate: Date;
}

