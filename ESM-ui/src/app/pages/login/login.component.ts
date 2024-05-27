import { TokenService } from './../../services/token/token.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { LoginRequest } from '../../services/models';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private snackBar: SnackbarService
  ){}

login() {
  this.errMsg = [];
  this.authService.login({body:this.authRequest}).subscribe({
    next: (res)=>{
      this.tokenService.token = res.token as string;
      this.router.navigate(['dashboard']);
      this.snackBar.openSnackBar('Login Successful', 'Close', 1000);
    },
    error:(err)=>{
      console.log(err);
      if(err.error.validationErrors){
        this.errMsg = err.error.validationErrors;
      } else{
        this.errMsg.push(err.error.businessErrorDescription
        );
      }
    }
  })
}

  authRequest: LoginRequest = {username: '', password: ''};
  errMsg: Array<string> = [];
}
