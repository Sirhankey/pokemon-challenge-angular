import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckTableComponent } from './deck-table.component';

describe('DeckTableComponent', () => {
  let component: DeckTableComponent;
  let fixture: ComponentFixture<DeckTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeckTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
