import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, LoadingComponent, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon-challenge-angular';

  isLoading = false;

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }
}
