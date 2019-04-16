import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {TableComponent} from './components/table/table.component';
import {CommonModule} from '@angular/common';
import {UsernameValidatorDirective} from './directives/username-validator.directive';
import {EqualValidatorDirective} from './directives/equal-validator.directive';

@NgModule({
  declarations: [
    TableComponent,
    UsernameValidatorDirective,
    EqualValidatorDirective
  ],
  imports: [
    CommonModule,
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
  ],
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
    UsernameValidatorDirective,
    EqualValidatorDirective
  ]
})
export class SharedModule {
}