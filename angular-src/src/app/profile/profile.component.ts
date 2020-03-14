import { Component, NgModule, OnInit } from '@angular/core';
import { UserApiService } from '../services/userAPI.service';
import { UserTamplate } from '../userTemplate'
import { FlashMessageService } from '../services/flashMessage.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

  profile: UserTamplate;

  constructor(private userAPI: UserApiService, private flashMessage: FlashMessageService){}

  ngOnInit(): void {
    this.userAPI.getProfile().subscribe(
      (data)=>{
        this.profile = data['user']
      },
      (error) => {
        console.log(error)
      }
    )
  }

  logout(){
    this.flashMessage.flashSuccess('Adeus ' + JSON.parse(localStorage.getItem('user'))['username'])
    this.userAPI.logoutUser()
  }

}