import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-content">
      <h2 class="text-lg font-semibold">{{ card.name }}</h2>
      <p class="text-gray-600">{{ card.supertype }}</p>
      <p class="text-gray-600">{{ card.types?.join(', ') }}</p>
      <p *ngIf="card.hp" class="text-gray-600">HP: {{ card.hp }}</p>
      <div *ngIf="card.attacks?.length">
        <h3 class="text-md font-semibold mt-2">Attacks:</h3>
        <ul>
          <li *ngFor="let attack of card.attacks">
            <strong>{{ attack.name }}:</strong> {{ attack.damage }} damage
          </li>
        </ul>
      </div>
      <div *ngIf="card.weaknesses?.length">
        <h3 class="text-md font-semibold mt-2">Weaknesses:</h3>
        <ul>
          <li *ngFor="let weakness of card.weaknesses">
            <strong>{{ weakness.type }}:</strong> {{ weakness.value }}
          </li>
        </ul>
      </div>
      <div *ngIf="card.rules?.length" class="rules-container">
        <h3 class="text-md font-semibold mt-2">Rules:</h3>
        <ul>
          <li *ngFor="let rule of card.rules">{{ rule }}</li>
        </ul>
      </div>
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
      width: 200px;
      bottom: 10px;
      right: 0px;
      max-height: 300px;
    }
    .rules-container {
      max-height: 100px;
      overflow-y: auto;
    }
  `]
})
export class TooltipComponent {
  @Input() card!: Card;
}
