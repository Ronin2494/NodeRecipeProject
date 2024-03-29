import { Component, OnInit, Input } from '@angular/core';
import { UserLogin, UserToken, UserRegister} from '../food';
import { FoodServiceService} from "../food-service.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FoodServiceService]
})
export class RegisterComponent implements OnInit {

  public registerdata: UserRegister = {
    _id:'',
    email: '',
    password: '',
    username: ''
  };
  form: FormGroup;

  constructor(private foodServiceService: FoodServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  public registerUser(registerdata: UserRegister): void{

    if (this.form.valid) {
      console.log('form submitted');
    } else {
      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);            
        control.markAsTouched({ onlySelf: true });      
      });
    }

    this.foodServiceService.userRegister(registerdata);
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
