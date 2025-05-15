import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-politica',
  standalone: true,
  imports: [CommonModule,
    ScrollPanelModule
  ],
  templateUrl: './politica.component.html'
})
export class PoliticaComponent {
 
}
