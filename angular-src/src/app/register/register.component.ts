import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor() { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm){
    const user = form.value;

    for (let [key, value] of Object.entries(user)){
      if(value==undefined){
        console.log(key + " missing")
        return
      }
    }

    //logic

  }

}
