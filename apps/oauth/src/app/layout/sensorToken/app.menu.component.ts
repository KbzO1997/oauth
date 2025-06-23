import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Util } from '@oauth/shared-config';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SessionService } from './session-service';
@Component({
    selector: 'app-sensor-token',
    templateUrl: './sensor-token.component.html',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, PanelModule],
    
})
export class SensorTokenComponent implements OnInit {
  
    util: Util = new Util();
    dialog = false;
    
    constructor(private sessionService: SessionService) {}

    ngOnInit() {
        this.sessionService.dialogVisible$.subscribe((visible) => {
            this.dialog = visible;
        });
    }

    redirectToLogin() {
        this.sessionService.hideDialog();
        window.location.href = '/principal';
    }
}
