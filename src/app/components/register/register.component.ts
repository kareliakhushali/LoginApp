import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  repeatPass:string = 'none';
  displayMsg: string = '';
  isAccountCreated:boolean = false;
  constructor(private authService:AuthService){

  }

  ngOnInit(): void {


  }
  registerForm : FormGroup = new FormGroup({
   firstname: new FormControl("", [Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    lastname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    email: new FormControl("",[Validators.required,Validators.email]),
    mobile:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]),
    gender: new FormControl("",[Validators.required]),
    pwd:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd:new FormControl("",[Validators.required]),
  });
  registerSubmitted()
  {
    if(this.PWD.value == this.RPWD.value)
    {
      console.log(this.registerForm.valid);
      this.repeatPass = 'none';
//console.log("submitted");

this.authService.registerUser([
    this.registerForm.value.firstname,
    this.registerForm.value.lastname,
    this.registerForm.value.email,
    this.registerForm.value.mobile,
    this.registerForm.value.gender,
    this.registerForm.value.pwd

]).subscribe(res=>{
  if(res=='Success'){
    this.displayMsg = "Account created successfully";
    this.isAccountCreated = true;
  }
  else if(res == 'Already exists'){
    this.displayMsg = "Account already exist.Try other email";
    this.isAccountCreated = false;
  }
  else{
    this.displayMsg = "Something went wrong";
    this.isAccountCreated = false;
  }
  //console.log(res);
})
    }
    else{
this.repeatPass = 'inline';
    }

    // it will show only values in the console
    //console.log(this.registerForm.value);
    //console.log(this.registerForm.get("firstname"))
  }
  get FirstName():FormControl{
    return this.registerForm.get('firstname') as FormControl;
  }
  get LastName():FormControl{
    return this.registerForm.get('lastname') as FormControl;
  }
  get Email():FormControl{
    return this.registerForm.get('email')as FormControl;
  }
  get Mobile():FormControl{
    return this.registerForm.get('mobile') as FormControl;

  }
  get Gender():FormControl{
    return this.registerForm.get('gender') as FormControl;
  }
  get PWD():FormControl{
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD():FormControl{
    return this.registerForm.get('rpwd') as FormControl;
  }



}
