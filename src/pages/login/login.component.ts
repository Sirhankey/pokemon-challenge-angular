import { Component } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio/audio.service';
import Swal from 'sweetalert2';
import { TYPE, toast } from '../../utils/toast-utils';

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
    private authService: AuthService, private router: Router, private appComponent: AppComponent, private audioService: AudioService
  ) { }

  login() {
    this.appComponent.showLoading();
    setTimeout(() => {
      if (this.authService.login(this.email, this.password)) {
        toast(TYPE.SUCCESS, true, 'Seja bem vindo treinador!');
        this.router.navigate(['/home']);
        this.audioService.play();
      } else {
        toast(TYPE.ERROR, true, 'Email ou senha inválidos!');
      }
      this.appComponent.hideLoading();
    }, 1000);
  }
}
