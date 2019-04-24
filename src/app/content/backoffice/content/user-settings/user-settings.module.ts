import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './user-settings.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { InitialsComponent } from './initials/initials.component';
import { AdressesComponent } from './adresses/adresses.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
    declarations: [UserSettingsComponent, InitialsComponent, AdressesComponent, PasswordComponent],
    imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
