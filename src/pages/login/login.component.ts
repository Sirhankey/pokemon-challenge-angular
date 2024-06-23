import { Component } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, private router: Router, private appComponent: AppComponent
  ) { }

  login() {
    this.appComponent.showLoading();
    setTimeout(() => {
      if (this.authService.login(this.email, this.password)) {
        alert('Seja bem vindo treinador!');
        this.router.navigate(['/home']);
      } else {
        alert('Email ou senha inválidos!');
      }
      this.appComponent.hideLoading();
    }, 1000);
  }
}
