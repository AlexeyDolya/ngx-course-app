import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
// import { EventsGuardService } from './events-guard.service';

const routes: Routes = [
    {
        path: '',
        component: EventsComponent,
        // canActivate: [EventsGuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventsRoutingModule {}
