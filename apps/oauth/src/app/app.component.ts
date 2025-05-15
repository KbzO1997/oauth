import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { SensorTokenComponent } from './layout/sensorToken/app.menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, SensorTokenComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PrimeNGConfig]
})
export class AppComponent  implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
