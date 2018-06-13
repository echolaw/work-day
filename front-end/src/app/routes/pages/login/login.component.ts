import { Component, OnInit, Injector } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from './login.service';
import { Login } from './login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;
  router: Router;

  constructor(
    public settings: SettingsService,
    fb: FormBuilder,
    private loginService: LoginService,
    public injector: Injector
  ) {
    this.valForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(loginInfo: Login) {
    loginInfo.username = loginInfo.username.trim();
    this.loginService.login(loginInfo).subscribe(res => {
      if (res && res.code === 0) {
        localStorage.setItem('access_token', res.data.accessToken);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        this.router.navigateByUrl('home');
      }
    });
  }

  submitForm($ev, value: Login) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      if (this.valForm.controls.hasOwnProperty(c)) {
        this.valForm.controls[c].markAsTouched();
      }
    }
    if (this.valForm.valid) {
      console.log('Valid!');
      console.log(value);
      this.login(value);
    }
  }

  ngOnInit() {
    this.router = this.injector.get(Router);
  }
}
