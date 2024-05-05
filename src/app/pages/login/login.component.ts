import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { saveToken } from 'src/app/utils/http-helpers.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password':  ['', [Validators.required, Validators.minLength(6)]],
   })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
     private spinner: NgxSpinnerService
  ) { }



  ngOnInit(): void {

  }

  onSubmit() {
    const credentials = this.loginForm.value
    this.spinner.show();

    this.loginService.login(credentials)
      .subscribe((result) => {
        if (result.statusCode === 200) {
          saveToken(result.data)
          this.spinner.hide();
          this.redirectHome()
        }
      }, (error) => {
        console.info('Error: ', error)
      })
  }

   public redirectHome() {
    this.router.navigate(['/']);
  }

}
