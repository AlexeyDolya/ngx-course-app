import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Output()
    public setSideBarControl: EventEmitter<any> = new EventEmitter();

    @ViewChild('drawer', { static: true })
    public drawer: any;

    public ngOnInit(): void {
        this.setSideBarControl.emit(this.drawer);
    }

    // public ngAfterViewInit(): void {
    //   this.setSideBarControl.emit(this.drawer);
    // }
}
