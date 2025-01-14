import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private us: UserService){}
  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }
  
  initForm(): void {
    this.form = new FormGroup({
      yourfieldname: new FormControl(''), // Valeur par défaut
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  sub():void{
    const user={...this.form.value, role:"client"}
    this.us.registerUser(user).subscribe(()=>{
      console.log("done")
    })
  }
}
