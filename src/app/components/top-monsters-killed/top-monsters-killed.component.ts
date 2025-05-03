import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { TopKilledCreature } from '../../models/top-killed-creature.model';
import { CommonModule } from '@angular/common';
import { TibiaService } from '../../services/tibia.service';

@Component({
  selector: 'app-top-monsters-killed',
  imports: [CommonModule],
  templateUrl: './top-monsters-killed.component.html',
  styleUrl: './top-monsters-killed.component.css'
})
export class TopMonstersKilledComponent implements OnInit{
  @Input() world: string = 'Thyria'; 
  topKills: TopKilledCreature [] = [];

  constructor(private tibiaService: TibiaService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['world'] && !changes['world'].firstChange) {
      this.fetchData();
    }
  }

  private fetchData(): void {
    if (!this.world) return;
    this.tibiaService.getTopKilledMonsters(this.world).subscribe((data) => {
      this.topKills = data;
    });
  }
  

  getImageUrl(name: string): string {
    if (!name) return '';
  
    // Normaliza el nombre
    let base = name.toLowerCase().trim();
  
    // Reglas especiales primero
    if (base.endsWith('men')) {
      base = base.slice(0, -3) + 'man'; // e.g. "men" → "man"
    } else if (base.endsWith('ves')) {
      base = base.slice(0, -3) + 'f'; // e.g. "wolves" → "wolf"
    } else if (base.endsWith('ies')) {
      base = base.slice(0, -3) + 'y'; // e.g. "zombies" → "zombie"
    } else if (base.endsWith('es')) {
      base = base.slice(0, -2); // e.g. "banshees" → "banshe"
    } else if (base.endsWith('s')) {
      base = base.slice(0, -1); // e.g. "rats" → "rat"
    }
  
    const snakeCase = base.replace(/\s+/g, '_');
    return `https://tibiopedia.pl/images/static/monsters/${snakeCase}.gif`;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://tibiopedia.pl/images/static/monsters/bug.gif'; // tu imagen por defecto
  }
  

  toTitleCase(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
