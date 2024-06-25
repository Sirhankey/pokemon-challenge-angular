import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio/audio.service';
import { TYPE, toast } from '../../utils/toast-utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos treinador!';
      return;
    }

    this.appComponent.showLoading();
    const { email, password } = this.loginForm.value;

    setTimeout(() => {
      if (this.authService.login(email, password)) {
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
