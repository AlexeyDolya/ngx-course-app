import {Component} from '@angular/core';
import {RouterAnimation, routerTransition} from 'src/app/shared/animations/router.animation';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
  animations: [routerTransition]
})
export class BackofficeComponent extends RouterAnimation {
  public drawer: any;

}