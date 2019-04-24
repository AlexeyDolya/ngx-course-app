import { Component } from '@angular/core';
import { RouterAnimation, routerTransition } from '@shared/animations/router.animation';

@Component({
    selector: 'app-backoffice',
    templateUrl: './backoffice.component.html',
    styleUrls: ['./backoffice.component.scss'],
    animations: [routerTransition],
})
export class BackofficeComponent extends RouterAnimation {
    public drawer: any;
    public constructor() {
        super();
    }
    public setDrawerControl(drawer: any): void {
        Promise.resolve().then(() => (this.drawer = drawer));
    }
}
