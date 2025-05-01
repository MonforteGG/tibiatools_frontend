import { Component } from '@angular/core';
import { HighscoreEntry } from '../../models/highscore-entry.model';
import { TibiaService } from '../../services/tibia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-experience',
  imports: [CommonModule],
  templateUrl: './top-experience.component.html',
  styleUrl: './top-experience.component.css'
})
export class TopExperienceComponent  {
  topPlayers: HighscoreEntry[] = [];

  constructor(private tibiaService: TibiaService) {}

  ngOnInit(): void {
    this.tibiaService.getTopExperiencePlayers().subscribe((data) => {
      this.topPlayers = data;
    });
  }

  getVocationIcon(vocation: string): string {
    const iconMap: Record<string, string> = {
      'Druid': '/assets/images/uh.png',
      'Elder Druid': '/assets/images/uh.png',
      'Sorcerer': '/assets/images/sd.png',
      'Master Sorcerer': '/assets/images/sd.png',
      'Knight': '/assets/images/magic_sword.png',
      'Elite Knight': '/assets/images/magic_sword.png',
      'Paladin': '/assets/images/crossbow.png',
      'Royal Paladin': '/assets/images/crossbow.png',
      'Monk': '/assets/images/staff.png',
      'Exalted Monk': '/assets/images/staff.png',
    };
  
    return iconMap[vocation] || 'https://tibiopedia.pl/images/static/items/scroll.gif'; // fallback
  }
}
