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
  
    // Normaliza y separa palabras
    let base = name.toLowerCase().trim();
    const words = base.split(' ');
    let last = words.pop() || '';
  
    // Excepciones comunes en monstruos de Tibia
    const exceptions: Record<string, string> = {
      men: 'man',
      women: 'woman',
      wolves: 'wolf',
      thieves: 'thief',
      dwarves: 'dwarf',
      elves: 'elf',
      calves: 'calf',
      knives: 'knife',
      lives: 'life',
      selves: 'self',
      feet: 'foot',
      geese: 'goose',
      oxen: 'ox',
      lice: 'louse',
      mice: 'mouse',
      spectres: 'spectre'
    };
  
    // Usar excepción si existe
    if (exceptions[last]) {
      last = exceptions[last];
    } else {
      // Reglas generales (plurales comunes)
      if (last.endsWith('ies')) {
        last = last.slice(0, -3) + 'y'; // zombies → zombie
      } else if (last.endsWith('es')) {
        last = last.slice(0, -2);       // banshees → banshe
      } else if (last.endsWith('s')) {
        last = last.slice(0, -1);       // rats → rat
      }
    }
  
    // Reconstrucción del nombre
    base = [...words, last].join(' ');
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
