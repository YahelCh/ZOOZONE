import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal, AnimalForCreation } from 'src/app/interfaces/animal.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

  public classes = [{ id: 1, text: 'Mammals' },
  { id: 2, text: 'Amphibians' },
  { id: 3, text: 'Reptiles' },
  { id: 4, text: 'poultry' }];

  public animalForm:FormGroup;
  public errorMessage:string;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.animalForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      numOfLegs: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      description:new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public validateControl = (controlName: string) => {
    if (this.animalForm.controls[controlName].invalid && this.animalForm.controls[controlName].touched)
      return true;
    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.animalForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public createAnimal = (animalFormValue) => {
    if (this.animalForm.valid) {
      this.executeAnimalCreation(animalFormValue);
    }
  }

  private executeAnimalCreation=(animalFormValue)=>{
    const animal: AnimalForCreation = {
      name: animalFormValue.name,
      numOfLegs:animalFormValue.numOfLegs,
      class: animalFormValue.class.text,
      description: animalFormValue.description
    }
    const apiUrl = 'animal';
    this.repository.create(apiUrl, animal)
      .subscribe(res => {
        alert(`${animal.name} successfully created`)
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToAnimalList=()=>{
    this.router.navigate(['/animal/list']);
  }


}
