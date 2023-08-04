import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth:AuthService,private router:Router) {}

  ngOnInit(): void {

  }
loginForm : FormGroup= new  FormGroup({
email : new FormControl("",[Validators.required,Validators.email]),
pwd : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
  });
  isUserValid:boolean = false;

  loginSubmitted()
  {
    this.loginAuth.loginUser([
      this.loginForm.value.email,
      this.loginForm.value.pwd,
    ])
    .subscribe(res=>{
      if(res=='Failure'){
        this.isUserValid = false;
       alert("Login unsuccessful");
      }
      else if(res=='admin')
      {
        this.isUserValid = true;
        this.router.navigateByUrl('admin-dashboard');
      }
      else
      {
        this.isUserValid = true;
      this.loginAuth.setToken(res);
      this.router.navigateByUrl('home');
       // alert(res);
        //alert("login successful");
      }

    });

    console.log(this.loginForm);
  }

  get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  get PWD():FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
