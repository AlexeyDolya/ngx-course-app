import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './user-settings.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { AdressesComponent } from './adresses/adresses.component';

@NgModule({
    declarations: [UserSettingsComponent, AdressesComponent],
    imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
