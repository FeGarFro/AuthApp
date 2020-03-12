import { Component, OnInit } from '@angular/core';
import { FormTemplateService} from '../services/form-template.service'
import { UserApiService } from '../services/userAPI.service';
import { FlashMessageService } from '../services/flashMessage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm =  this.formTemplate.form;
  
  constructor(private formTemplate: FormTemplateService,
              private userAPI: UserApiService,
              private flashMessage: FlashMessageService) { 
    
  }

  ngOnInit(): void {
  }

  onLogin(){
    this.userAPI.loginUser(this.loginForm.value).subscribe((data)=>{
      if(data['success']){
        this.userAPI.storageUser(data['token'], data['user'])
        this.flashMessage.flashSuccess('Bem-vindo ' + data['user']['username'])
      }
      else{
        this.flashMessage.flashError(data['msg'])
      }
    })
  }

}
