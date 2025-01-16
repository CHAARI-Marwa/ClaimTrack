import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  constructor(private us: UserService, private router: Router){}
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

  sub(): void {
    const user = { ...this.form.value };
    this.us.loginUser(user.email, user.password).subscribe(
      (response) => {
        console.log("Response from backend:", response);
        const userId = response?.user?.id;
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }
        if(response.user.role=="client"){
          this.router.navigate(['/dashboardclient', userId]);}
        else{
          this.router.navigate(['/dashboardadmin/clients']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
  
}
