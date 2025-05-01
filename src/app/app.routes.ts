import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';
import { LootClassifierComponent } from './pages/loot-classifier/loot-classifier.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'classifier', component: LootClassifierComponent },
    { path: 'stats', component: StatsComponent }
  ];
