import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './user-settings.component';
import { SharedModule } from '@shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { InitialsComponent } from './initials/initials.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PasswordComponent } from './password/password.component';
import { SwitcherComponent } from './initials/switcher/switcher.component';

@NgModule({
    declarations: [UserSettingsComponent, InitialsComponent, AddressesComponent, PasswordComponent, SwitcherComponent],
    imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
