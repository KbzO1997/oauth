import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) { }

    btnCloseLogin() :void {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('nombre');
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    btnProfilePerson() :void {
        this.router.navigate(['/personal-info']);
    }    
}
