import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BackofficeComponent } from './backoffice.component';
import { NgModule } from '@angular/core';
import { BackoffficeRoutingModule } from './backoffice-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    declarations: [BackofficeComponent, HeaderComponent, SidebarComponent],
    imports: [SharedModule, BackoffficeRoutingModule, HttpClientModule],
})
export class BackofficeModule {}
