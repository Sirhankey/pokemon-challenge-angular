import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextTooltipComponent } from '../../components/tooltip/text-tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextTooltipComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  tooltipText: string = '';
  showTooltip: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  goToBoosterShop(): void {
    this.router.navigate(['/shop']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }


}
