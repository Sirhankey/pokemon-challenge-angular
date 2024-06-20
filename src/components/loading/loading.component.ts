import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <img [src]="imageSrc" class="loader" alt="Loading">
    </div>
  `,
  styles: [`
    .fixed { position: fixed; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .bg-black { background-color: black; }
    .bg-opacity-50 { opacity: 0.5; }
    .loader {
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent implements OnInit {
  imageSrc: string = '';

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    this.imageSrc = `assets/loading/${randomIndex}.png`;
  }
}
