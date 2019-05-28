import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { InitialsComponent } from './initials/initials.component';
import { AddressesComponent } from './addresses/addresses.component';
import { SwitcherComponent } from './initials/switcher/switcher.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ProfileComponent, InitialsComponent, AddressesComponent, SwitcherComponent],
    imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
