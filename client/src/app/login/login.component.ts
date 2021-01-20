import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faDoorOpen, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    roomName: new FormControl('', [Validators.required, Validators.maxLength(30)])
  }, {updateOn: 'submit'});

  faUser = faUser;
  faDoorOpen = faDoorOpen;
  faSignInAlt = faSignInAlt;
  usernameAvailability!: string;
  isSubmitting: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  handleLogin(): void {
    if(this.form.valid) {
      this.isSubmitting = true;
      let username = this.form.get('username')!.value;
      let roomName = this.form.get('roomName')!.value;

      this.http
        .get<any>("http://localhost:8000/username-availability/" + roomName + "/" + username, 
          {responseType: 'text' as 'json'})
        .toPromise()
        .then(res => {
          this.usernameAvailability = res
          if(this.usernameAvailability === "Unavailable") {
            this.form.controls.username.setErrors({usernameTaken: true})
            this.isSubmitting = false;
          } else {
            this.router.navigate(
              ['/room', roomName], 
              {queryParams: {user: username}}
            );
          }
        });
    }
  }

}
