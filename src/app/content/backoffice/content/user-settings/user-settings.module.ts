import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './user-settings.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { InitialsComponent } from './initials/initials.component';

@NgModule({
    declarations: [UserSettingsComponent, InitialsComponent],
    imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
