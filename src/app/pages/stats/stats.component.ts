import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackgroundComponent } from "../../components/background/background.component";
import { LayoutComponent } from "../../components/layout/layout.component";
import { CardComponent } from "../../components/card/card.component";
import { DailyBoostedComponent } from "../../components/daily-boosted/daily-boosted.component";
import { TopExperienceComponent } from "../../components/top-experience/top-experience.component";
import { TopMonstersKilledComponent } from "../../components/top-monsters-killed/top-monsters-killed.component";
import { TibiaService } from '../../services/tibia.service';

@Component({
  selector: 'app-stats',
  imports: [BackgroundComponent, LayoutComponent, CardComponent, DailyBoostedComponent, TopExperienceComponent, TopMonstersKilledComponent, CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  worlds: string[] = []; 
  selectedWorld: string = 'Antica';

  constructor(private tibiaService: TibiaService) {}

  ngOnInit(): void {
    this.tibiaService.getWorlds().subscribe((data) => {
      this.worlds = data;
    });
  }


  getEffectiveRashidDay(): number {
    const now = new Date();
    const hour = now.getHours();
  
    // Si es antes de las 10 AM, retroceder un día
    if (hour < 10) {
      const previousDay = now.getDay() - 1;
      return previousDay < 0 ? 6 : previousDay; // Si es domingo (0), volver al sábado (6)
    }
  
    return now.getDay(); // Día real si ya pasó de las 10 AM
  }


  getRashidInfo(): { city: string; description: string; image: string } {
    const rashidLocations = [
      { city: 'Svargrond', description: 'Inside the tavern in Svarground', image: 'https://i.imgur.com/lSqgOWf.gif' },
      { city: 'Liberty Bay', description: 'Near the ship in Liberty Bay', image: 'https://i.imgur.com/FHHVMEi.gif' },
      { city: 'Port Hope', description: 'Near the temple in Port Hope', image: 'https://i.imgur.com/MyswlTV.gif' },
      { city: 'Ankrahmun', description: 'Inside the magic shop in Ankrahmun', image: 'https://i.imgur.com/bPZprlm.gif' },
      { city: 'Darashia', description: 'Inside the house west of the bank in Darashia', image: 'https://i.imgur.com/dp96j37.gif' },
      { city: 'Edron', description: 'Inside the magic shop in Edron', image: 'https://i.imgur.com/eduAmAN.gif' },
      { city: 'Carlin', description: 'In the first floor of the depot in Carlin', image: 'https://i.imgur.com/4k3Xzmr.gif' },
    ];
  
    const today = new Date().getDay(); // 0 = Domingo
    return rashidLocations[today];
  }
}
