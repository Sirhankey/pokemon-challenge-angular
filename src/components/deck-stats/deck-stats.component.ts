import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TDeck } from '../../models/user.model';
import pokemonTypes from '../../utils/pokemon-types';
import { CommonModule } from '@angular/common';
import { TCard } from '../../models/card.model';

@Component({
  selector: 'app-deck-stats',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './deck-stats.component.html',
  styleUrls: ['./deck-stats.component.scss']
})
export class DeckStatsComponent {
  @Input() selectedDeck: TDeck | null = null;
  @Output() panelStateChange = new EventEmitter<boolean>();

  panelOpenState = false;

  onPanelToggle(): void {
    this.panelOpenState = !this.panelOpenState;
    this.panelStateChange.emit(this.panelOpenState);
  }

  get totalCards(): number {
    return this.selectedDeck?.cards.length || 0;
  }

  get totalPokemons(): number {
    return this.selectedDeck?.cards.filter((card: TCard) => card.supertype === 'Pokémon').length || 0;
  }

  get totalEnergy(): number {
    return this.selectedDeck?.cards.filter((card: TCard) => card.supertype === 'Energy').length || 0;
  }

  get totalTrainers(): number {
    return this.selectedDeck?.cards.filter((card: TCard) => card.supertype === 'Trainer').length || 0;
  }

  get pokemonTypes(): { type: string, count: number, icon: string, bg: string }[] {
    if (!this.selectedDeck) return [];
    const typeCounts: { [key: string]: number } = {};
    this.selectedDeck.cards.forEach(card => {
      if (card.supertype === 'Pokémon') {
        card.types?.forEach(type => {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
      }
    });
    return Object.keys(typeCounts).map(type => ({
      type,
      count: typeCounts[type],
      icon: this.getTypeIcon(type),
      bg: this.getBgColor(type)
    }));
  }

  private getTypeIcon(type: string): string {
    const typeIcon = pokemonTypes.find(t => t.type === type.toLowerCase());
    return typeIcon ? typeIcon.src : '';
  }

  private getBgColor(type: string): string {
    const typeIcon = pokemonTypes.find(t => t.type === type.toLowerCase());
    return typeIcon ? typeIcon.className : '';
  }
}
