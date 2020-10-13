import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { AnimalCreateComponent } from './animal-create/animal-create.component';


@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalDetailsComponent,
    AnimalCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: AnimalListComponent },
      { path: 'details/:id', component: AnimalDetailsComponent },
      { path: 'create', component: AnimalCreateComponent }
    ])
  ]
})
export class AnimalModule { }
