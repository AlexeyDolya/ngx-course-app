import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {
}
