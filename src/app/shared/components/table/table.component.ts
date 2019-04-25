import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Input()
    public displayedColumns!: string[];

    @Input()
    public dataSource: any;

    @Input()
    public page!: number;

    @Input()
    public length!: number;

    @Output()
    public eventId: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public newPage: EventEmitter<number> = new EventEmitter<number>();

    public changePage({ pageIndex }: any): void {
        this.newPage.emit(pageIndex);
    }

    public handleClick(_id: string, status: boolean): void {
        if (status) {
            this.eventId.emit(_id);
        }
    }
}
