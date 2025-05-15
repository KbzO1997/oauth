import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './app.menuitem.component';
import { Util } from '@oauth/shared-config';
import { menuConfig } from './menuConfig/app.menu.config';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [CommonModule, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    util: Util = new Util();

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = menuConfig[this.getUserRole()] || [];
    }

    private getUserRole(): string {
        console.log("Rol: " + this.util.getRolSessionUser());
        return this.util.getRolSessionUser() || "admin"; //marketing
    }
}
