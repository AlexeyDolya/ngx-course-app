import { Component } from '@angular/core';
import { routerTransition, RouterAnimation } from './shared/animations/router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent extends RouterAnimation {

}
