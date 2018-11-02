import { Component, OnInit } from '@angular/core';
import { navigationItems } from './navigation';
import { Router } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication/user-authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  private userName: string;

  constructor(
    private router: Router,
    private _userAuthService: UserAuthenticationService,
  ) {     
    this.navItems = navigationItems;

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    /* gets user name userAuthService */
    this.userName = this._userAuthService.userAuthUserName;
  }

  logout(){
    this._userAuthService.removeJWTToken();
    this.router.navigateByUrl('/');
  }
}


