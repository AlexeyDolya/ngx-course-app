import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SignupComponent],
    imports: [SharedModule, FormsModule, SignupRoutingModule],
})
export class SignupModule {}
