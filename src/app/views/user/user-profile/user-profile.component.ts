import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userEmailId;
  userDetails;
  
  constructor(private _getUserService: UserProfileService) {}

  ngOnInit() {
    this.userEmailId = sessionStorage.getItem('userMailID');
    this.getUserProfile(`email=${this.userEmailId}`);
  }

  getUserProfile(queryParam): void {
    this._getUserService.getUserProfile(queryParam).subscribe(
      data => {
        this.userDetails = data;
        console.log('getting userdata successful', data);
      },
      error => {
        console.log('getting userdata unsuccessful', error);
      }
    );
  }
}
