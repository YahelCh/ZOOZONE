import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { AnimalCreateComponent } from './animal-create/animal-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { MultiFilterComponent } from '../multi-filter/multi-filter.component';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalDetailsComponent,
    AnimalCreateComponent,
    AnimalEditComponent,
    MultiFilterComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule , 
    RouterModule.forChild([
      { path: 'list', component: AnimalListComponent },
      { path: 'details/:id', component: AnimalDetailsComponent },
      { path: 'create', component: AnimalCreateComponent },
      { path: 'edit/:id', component: AnimalEditComponent }
    ])
  ],
  exports:[FontAwesomeModule]
})
export class AnimalModule { }
