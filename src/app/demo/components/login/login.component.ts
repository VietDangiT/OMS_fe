import { Component, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password:string;
  role: Role;
  token?: string;
}

export enum Role{
 ADMIN = 'Admin',
 MANAGER ='Manager',
 USER = 'User'
}

export interface SignIn{
    UserName: any;
    UserPassword: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent {
  showPassword: boolean = false;
  users:User[] =[];
  isLoading: boolean = false;
  constructor(private authService : AuthService, private router: Router , private messageService: MessageService){}
  
  signInForm = new FormGroup({
    UserName: new FormControl('',Validators.required),
    UserPassword: new FormControl('',Validators.required)
  });
  
  ngOnInit(){ 
    
  }

  onSubmit(){
    this.signInForm.markAllAsTouched();
    if(!this.signInForm.valid){
      this.errorToast();
    }else{
      var user = this.signInForm.value;
      this.authService.login(this.signInForm.value).subscribe(token => {
        localStorage.setItem("token", token);
      });

      this.isLoading= true;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        this.isLoading=false;
      }, 1000);
  }}
  
  togglePassword(){
    this.showPassword = !this.showPassword;
  }
 
  errorToast(){
    this.messageService.add({severity:'error', summary:'Error', detail:'Enter valid form value', closable:true});
  }
}

