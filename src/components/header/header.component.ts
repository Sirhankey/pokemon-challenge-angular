import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TUser } from '../../models/user.model';
import { AudioService } from '../../services/audio/audio.service';
import Swal from 'sweetalert2';
import { TYPE, toast } from '../../utils/toast-utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  trainerName: string = '';
  money: number = 0;
  isAuthenticated: boolean = false;
  user: TUser | null = null;
  totalCards: number = 0;
  isPlaying: boolean = false;

  private userSubscription: Subscription | null = null;
  private audioSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService, private router: Router, private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
      this.trainerName = user?.name || 'Ash Ketchum';
      this.money = user?.money || 0;
      this.totalCards = user?.cards?.length || 0;
    });

    this.audioSubscription = this.audioService.isPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    toast(TYPE.SUCCESS, true, 'Valeu treinador!');
    this.audioService.stop();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleAudio(): void {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
  }
}
