import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterShopComponent } from './booster-shop.component';

describe('BoosterShopComponent', () => {
  let component: BoosterShopComponent;
  let fixture: ComponentFixture<BoosterShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoosterShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoosterShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
