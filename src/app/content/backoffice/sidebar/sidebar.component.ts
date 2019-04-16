import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  @Output()
  public setSideBarControl: EventEmitter<any> = new EventEmitter();

  @ViewChild('drawer')
  public drawer: any;

  public ngAfterViewInit(): void {
    this.setSideBarControl.emit(this.drawer);
  }
}
