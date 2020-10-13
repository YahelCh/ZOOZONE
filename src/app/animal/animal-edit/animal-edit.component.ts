import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal, AnimalForCreation } from 'src/app/interfaces/animal.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {

  public classes = [{ id: 1, text: 'Mammals' },
  { id: 2, text: 'Amphibians' },
  { id: 3, text: 'Reptiles' },
  { id: 4, text: 'poultry' }];

  public animal: Animal;
  public animalForm: FormGroup;
  public errorMessage: string;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.animalForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      numOfLegs: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getAnimalByID();
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

  public getAnimalByID=()=>{
    let animalId: string = this.activeRoute.snapshot.params['id'];
    
    let animalByIdUrl: string = `animal/${animalId}`;
    this.repository.getData(animalByIdUrl)
      .subscribe(res => {
        this.animal = res as Animal;
        this.animalForm.patchValue(this.animal);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })

  }

  public updateAnimal = (animalFormValue) => {
    if (this.animalForm.valid) {
      this.executeAnimalUpdate(animalFormValue);
    }
  }
  private executeAnimalUpdate = (animalFormValue) => {
    this.animal.numOfLegs = animalFormValue.numOfLegs;
    this.animal.class = animalFormValue.class;
    this.animal.description = animalFormValue.description
    
    let apiUrl = `animal/${this.animal.id}`;
    this.repository.update(apiUrl, this.animal)
      .subscribe(res => {
        alert(`${this.animal.name} successfully updated`);
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToAnimalList = () => {
    this.router.navigate(['/animal/list']);
  }
}
