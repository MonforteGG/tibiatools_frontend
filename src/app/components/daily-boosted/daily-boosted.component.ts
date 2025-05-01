import { Component, OnInit } from '@angular/core';
import { TibiaService } from '../../services/tibia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-boosted',
  templateUrl: './daily-boosted.component.html',
  imports: [CommonModule],
  styleUrls: ['./daily-boosted.component.css']
})
export class DailyBoostedComponent implements OnInit {
  boostedCreature: string = '';
  boostedBoss: string = '';

  constructor(private tibiaService: TibiaService) {}

  ngOnInit(): void {
    this.tibiaService.getBoostedCreature().subscribe((name) => {
      this.boostedCreature = name;
    });

    this.tibiaService.getBoostedBoss().subscribe((name) => {
      this.boostedBoss = name;
    });
  }

  getImageUrl(name: string): string {
    if (!name) return '';
    const snakeCase = name.toLowerCase().replace(/\s+/g, '_');
    return `https://tibiopedia.pl/images/static/monsters/${snakeCase}.gif`;
  }
  
}
