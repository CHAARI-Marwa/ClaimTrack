import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  constructor(private us: UserService){}
  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }
  
  initForm(): void {
    this.form = new FormGroup({
      yourfieldname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  sub():void{
    const user={...this.form.value}
    this.us.loginUser(user.email,user.password).subscribe(()=>{
      console.log("done")
    })
  }
}
