import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
import { environment } from '@env/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { ValidatorService } from '@shared/services/validator.service';
import { OldPasswordValidatorDirective } from '@shared/directives/oldPassword-validator.directive';
import { UsernameUniqValidatorDirective } from '@shared/directives/usernameUniq-validator.directive';

@NgModule({
    declarations: [
        TableComponent,
        UsernameValidatorDirective,
        EqualValidatorDirective,
        OldPasswordValidatorDirective,
        UsernameUniqValidatorDirective,
    ],
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
    exports: [
        CommonModule,
        TableComponent,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatTableModule,
        MatGridListModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        DragDropModule,
        FlexLayoutModule,
        UsernameValidatorDirective,
        EqualValidatorDirective,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
        OldPasswordValidatorDirective,
        UsernameUniqValidatorDirective,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
        {
            provide: BASE_URL_TOKEN,
            useValue: environment.baseUrl,
        },
        ValidatorService,
    ],
})
export class SharedModule {}
