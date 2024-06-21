import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-content">
      {{ text }}
    </div>
  `,
  styles: [`
    .tooltip-content {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 10;
      font-size: 12px;
      width: 150px;
      bottom: 10px;
      right: 0px;
    }
  `]
})
export class TextTooltipComponent {
  @Input() text: string = '';
}
