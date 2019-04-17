import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './user-settings.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';

@NgModule({
    declarations: [UserSettingsComponent],
    imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
