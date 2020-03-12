import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/userAPI.service';
import { FlashMessageService } from '../services/flashMessage.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userAPI: UserApiService, private flashMessage: FlashMessageService) { }

  ngOnInit(): void {
    this.userAPI.getUsers().subscribe(
      (data)=>{console.log("DATA: " + data )},
      (err)=>{
        this.flashMessage.flashError(err['message'])
        console.log(err)
      }
    
    )
  }
}
