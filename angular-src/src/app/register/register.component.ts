import { Component, OnInit } from '@angular/core';
import { FormTemplateService} from '../services/form-template.service'
import { UserApiService } from '../services/userAPI.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm =  this.formTemplate.form;
  

  constructor(private formTemplate: FormTemplateService, private userAPI: UserApiService) {
    
  }

  ngOnInit(): void {
    console.log(this.registerForm.controls)
    
  }

  onRegister(){

    console.log(this.registerForm.value);

    this.userAPI.registerUser(this.registerForm.value).subscribe((data) => {console.log(data)})

  }

}

