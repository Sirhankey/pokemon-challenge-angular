import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deck-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './deck-table.component.html',
  styleUrls: ['./deck-table.component.scss'],
})
export class DeckTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() cards: Card[] = [];
  @Output() addCardToDeck = new EventEmitter<Card>();

  columnsToDisplay = ['pokedexNumber', 'image', 'name', 'quantity', 'type', 'actions'];
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.processCards();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['cards']) {
      this.processCards();
    }
  }

  processCards() {
    const cardMap: { [name: string]: Card & { quantity: number } } = {};

    this.cards.forEach(card => {
      if (cardMap[card.name]) {
        cardMap[card.name].quantity += 1;
      } else {
        cardMap[card.name] = { ...card, quantity: 1 };
      }
    });

    let processedCards = Object.values(cardMap);

    // Ordena os cartões com base no supertype e, se for Pokémon, pelo nationalPokedexNumbers
    processedCards.sort((a, b) => {
      const order = ['Pokémon', 'Trainer', 'Energy'];
      const typeComparison = order.indexOf(a.supertype) - order.indexOf(b.supertype);
      if (typeComparison === 0 && a.supertype === 'Pokémon' && b.supertype === 'Pokémon') {
        const aPokedexNumber = a.nationalPokedexNumbers ? a.nationalPokedexNumbers[0] : 0;
        const bPokedexNumber = b.nationalPokedexNumbers ? b.nationalPokedexNumbers[0] : 0;
        return aPokedexNumber - bPokedexNumber;
      }
      return typeComparison;
    });

    this.dataSource = new MatTableDataSource<Card>(processedCards);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onAddCardToDeck(card: Card) {
    this.addCardToDeck.emit(card);
  }
}
