import { Component, OnInit } from '@angular/core';
import { RouterAnimation, routerTransition } from '../../../../src/app/shared/animations/router.animation';
import { MessagingService } from '../../shared/services/notification.service';

@Component({
    selector: 'app-backoffice',
    templateUrl: './backoffice.component.html',
    styleUrls: ['./backoffice.component.scss'],
    animations: [routerTransition],
})
export class BackofficeComponent extends RouterAnimation implements OnInit {
    public drawer: any;
    public message: any;
    public constructor(private messagingService: MessagingService) {
        super();
    }
    public setDrawerControl(drawer: any): void {
        Promise.resolve().then(() => (this.drawer = drawer));
    }
    public ngOnInit(): void {
        const userId: any = 'user001';
        this.messagingService.requestPermission(userId);
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
    }
}
