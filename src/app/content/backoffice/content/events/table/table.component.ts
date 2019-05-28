import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Input()
    public dataSource: any;

    @Output()
    public eventId: EventEmitter<string> = new EventEmitter<string>();

    public handleClick(_id: string, status: boolean): void {
        if (status) {
            this.eventId.emit(_id);
        }
    }
}
