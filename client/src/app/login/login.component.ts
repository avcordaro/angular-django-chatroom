import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faDoorOpen, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    roomName: new FormControl('')
  });

  faUser = faUser;
  faDoorOpen = faDoorOpen;
  faSignInAlt = faSignInAlt;

  constructor(
	private router: Router,
  ) {}

  ngOnInit(): void {}

  handleLogin(): void {
  	this.router.navigate(
  		['/room', this.form.get('roomName')!.value], 
  		{queryParams: {user: this.form.get('username')!.value}}
  	);
  }

}
