import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'src/app/services/user-authentication/user-authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public locationPath;
  public contentAreaFlag = false;
  public isLoggedIn: boolean;

  constructor(
    public router: Router,
    public _userAuthService: UserAuthenticationService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLocationPath();
    this.loggedIn();
  }

  getLocationPath() {
    this.locationPath = this.activatedRoute.snapshot.routeConfig.path;
    if (this.locationPath === '') {
      this.contentAreaFlag = true;
    } else { 
      this.contentAreaFlag = false;
    }
  }

  logout(){
    this._userAuthService.removeJWTToken();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

  loggedIn() {
    var loginStatus = this._userAuthService.isLoggedIn();
    this.isLoggedIn = loginStatus;
  }  
}
