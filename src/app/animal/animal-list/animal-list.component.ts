import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  public animals: Animal[];
  public errorMessage: string = '';


  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllAnimals();
  }

  public addNewAnimal=()=>{
    const createUrl: string = `/animal/create`; 
    this.router.navigate([createUrl]); 
  }

  public getAllAnimals = () => {
    let apiAddress: string = "animal";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.animals = res as Animal[];
      }, (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }

      )
  }

}
