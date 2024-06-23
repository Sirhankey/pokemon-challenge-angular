import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  trainerName: string = '';
  money: number = 0;
  isAuthenticated: boolean = false;
  user: User | null = null;
  totalCards: number = 0;

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
      this.trainerName = user?.name || 'Ash Ketchum';
      this.money = user?.money || 0;
      this.totalCards = user?.cards?.length || 0;
    });

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
