import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserApiService } from '../services/userAPI.service';
import { FlashMessageService } from '../services/flashMessage.service'



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout(){
    this.flashMessage.flashSuccess('Adeus ' + JSON.parse(localStorage.getItem('user'))['username'])
    this.userAPI.logoutUser()
  }

  constructor(private userAPI: UserApiService, private flashMessage: FlashMessageService, private breakpointObserver: BreakpointObserver) {}

}
