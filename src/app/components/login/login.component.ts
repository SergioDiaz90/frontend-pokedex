import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  async login() {
    let response = await this.authService.login(this.username, this.password);
    if (response) {
      console.log('loginComponent', response);
      this.router.navigate(['/dashboard']);
    }
  }

}
