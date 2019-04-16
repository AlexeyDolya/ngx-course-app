import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface IPeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                // each time the binding value changes
                query(':leave', [stagger(100, [animate('.5s', style({ opacity: 0 }))])], { optional: true }),
                query(':enter', [style({ opacity: 0 }), stagger(100, [animate('.5s', style({ opacity: 1 }))])], {
                    optional: true,
                }),
            ]),
        ]),
    ],
})
export class DashboardComponent {
    public todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    public progress: string[] = [];
    public qa: string[] = [];
    public done: string[] = [];

    public drop(event: CdkDragDrop<string[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
