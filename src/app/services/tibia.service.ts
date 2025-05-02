import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HighscoreEntry } from '../models/highscore-entry.model';
import { TopKilledCreature } from '../models/top-killed-creature.model';

@Injectable({ providedIn: 'root' })
export class TibiaService {
  private baseUrl = 'https://api.tibiadata.com/v4'; // Ajusta según tu entorno backend

  constructor(private http: HttpClient) {}

  getBoostedCreature(): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/creatures`).pipe(
      map((res) => res.creatures?.boosted?.name || 'Unknown')
    );
  }

  getBoostedBoss(): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/boostablebosses`).pipe(
      map((res) => res.boostable_bosses?.boosted?.name || 'Unknown')
    );
  }

  getTopExperiencePlayers(): Observable<HighscoreEntry[]> {
    return this.http.get<any>(`${this.baseUrl}/highscores/all/experience/all/1`).pipe(
      map((res) => res.highscores?.highscore_list?.slice(0, 5) || [])
    );
  }

  getTopKilledMonsters(world: string): Observable<TopKilledCreature[]> {
    return this.http.get<any>(`${this.baseUrl}/killstatistics/${world}`).pipe(
      map((res) => {
        const entries = res.killstatistics?.entries || [];
        return entries
          .filter((entry: any) => entry.last_day_killed > 0)
          .sort((a: any, b: any) => b.last_day_killed - a.last_day_killed)
          .slice(0, 5)
          .map((entry: any, index: number) => ({
            name: entry.race,
            kills: entry.last_day_killed,
            rank: index + 1,
          }));
      })
    );
  }

  getWorlds(): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/worlds`).pipe(
      map((res) => res.worlds?.regular_worlds?.map((world: any) => world.name) || [])
    );
  }
  
}
