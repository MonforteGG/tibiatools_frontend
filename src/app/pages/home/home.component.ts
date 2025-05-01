import { Component } from '@angular/core';
import { BackgroundComponent } from "../../components/background/background.component";
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [BackgroundComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  isDarkMode = false;

  ngOnInit(): void {
    this.checkDarkMode();
    
    // (Opcional) Revisa cada cierto tiempo si cambia el modo
    const observer = new MutationObserver(() => this.checkDarkMode());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
  
  checkDarkMode() {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }
}
